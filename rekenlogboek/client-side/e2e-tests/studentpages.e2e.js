const puppeteer = require('puppeteer')
jest.setTimeout(120000)

describe(`Open en fill in logbook on Teams for students`, () => {
	let browser, teams
	let iframe, newWindow
	// let iframe, newWindow

	const student = {
		email: `ldeboer@teamjaguarundi.onmicrosoft.com`,
		pass: '+h2Mc3N*&$^m7%nB'
	}

	beforeAll(async () => {
		// create two browsers
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 70,
			ignoreHTTPSErrors: true,
			args: [
				'--start-maximized',
				// Below needed for iframe -> https://stackoverflow.com/a/65489913/9401138
				// Why ? I have no clue
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process'
			],
			defaultViewport: null
		})
		teams = await browser.newPage()
	})

	afterAll(async () => {
		await browser.close()
	})

	test(`Sign in on teams environment`, async () => {
		await teams.goto('https://teams.microsoft.com')

		// Enter email
		await teams.waitForSelector('input[name=loginfmt]')
		await teams.type('input[name=loginfmt]', student.email)
		await teams.click('input[type=submit]')

		// Enter password
		await teams.waitForSelector('input[name=passwd]')
		await teams.type('input[name=passwd]', student.pass)
		await teams.click('input[type=submit]')

		// Caption: "Aangemeld blijven?" -> click: "Ja"
		await teams.waitForSelector('#idSIButton9')
		await teams.click('#idSIButton9')

		// Wait for teams to be loaded
		await teams.waitForSelector('.app-messages-header.ts-section-divider')

		const teamsIndex =
			'https://teams.microsoft.com/_#/conversations/Algemeen?threadId=19:552907fdb29b4feda1aae0164015e58d@thread.tacv2&ctx=channel'
		const teamsIndexEN =
			'https://teams.microsoft.com/_#/conversations/General?threadId=19:552907fdb29b4feda1aae0164015e58d@thread.tacv2&ctx=channel'

		try {
			expect(teams.url()).toBe(teamsIndex)
		} catch {
			expect(teams.url()).toBe(teamsIndexEN)
		}
	})

	test(`Open 'rekenlogboek' tab within teams environment`, async () => {
		// Find and click correct tab
		await teams.waitForSelector('div[title="Rekenlogboek"]')
		await teams.click('div[title="Rekenlogboek"]')

		// Wait for 'rekenlogboek' to be openend
		iframe = await teams.waitForSelector('.embedded-page-container iframe')

		expect(iframe).toBeDefined()
	})

	test(`SignIn on Rekenlogboek within teams environment`, async () => {
		const rekenlogboek = await iframe.contentFrame()

		await rekenlogboek.waitForSelector(`.MicrosoftButton`)
		await rekenlogboek.click(`.MicrosoftButton`)
		newWindow = new Promise(x =>
			browser.once('targetcreated', target => x(target.page()))
		)
		expect(newWindow).toBeDefined()
	})

	test(`Enter credentials on Microsoft oAuth popup`, async () => {
		const oAuth = await newWindow

		await oAuth.waitForSelector('.tile-img')
		await oAuth.click('.tile-img')

		await oAuth.waitForTimeout(3000)
		expect(oAuth.isClosed()).toBe(true)
	})

	test(`Select a value for the 1st learngoal`, async () => {
		const rekenlogboek = await iframe.contentFrame()

		await rekenlogboek.waitForSelector('.Jumbotron', { visible: true })
		await rekenlogboek.waitForSelector('input[value="Ik snap het goed"]')
		await rekenlogboek.click('input[value="Ik snap het goed"]')

		const radiobutton = await rekenlogboek.$('input[value="Ik snap het goed"]')

		const isRadioSelected = await (
			await radiobutton.getProperty('checked')
		).jsonValue()

		expect(isRadioSelected).toBe(true)
	})

	test(`Go to the next goal`, async () => {
		const rekenlogboek = await iframe.contentFrame()

		await rekenlogboek.waitForSelector('.Jumbotron', { visible: true })
		await rekenlogboek.waitForSelector('.next button')
		await rekenlogboek.click(`.next button`)

		await rekenlogboek.waitForSelector('.learngoal2')

		// await rekenlogboek.waitForTimeout(5000)

		// let learngoaltitle = await rekenlogboek.$('h1[name="Leerdoel 2: Doel 2"]')

		// await learngoaltitle.getProperty('name').jsonValue()
		// expect(learngoaltitle).toBe('Leerdoel 2: Doel 2')
	})

	test(`Select a value for the 2nd learngoal`, async () => {
		const rekenlogboek = await iframe.contentFrame()

		await rekenlogboek.waitForSelector('.Jumbotron', { visible: true })
		await rekenlogboek.waitForSelector('input[value="Ik snap het niet"]')
		await rekenlogboek.click('input[value="Ik snap het niet"]')

		const radiobutton = await rekenlogboek.$('input[value="Ik snap het niet"]')

		const isRadioSelected = await (
			await radiobutton.getProperty('checked')
		).jsonValue()

		expect(isRadioSelected).toBe(true)
	})

	// test(`Go to result page`, async () => {
	// 	const rekenlogboek = await iframe.contentFrame()

	// 	await rekenlogboek.waitForSelector('.Jumbotron', { visible: true })
	// 	await rekenlogboek.waitForSelector('.blue')
	// 	await rekenlogboek.click('.blue')

	// 	await rekenlogboek.waitForTimeout(3000)

	// 	await rekenlogboek.waitForSelector('.table')

	// 	const learngoaltitle = await rekenlogboek.$('.cell:nth-child(6)')

	// 	expect(learngoaltitle).toBeDefined()
	// })
})
