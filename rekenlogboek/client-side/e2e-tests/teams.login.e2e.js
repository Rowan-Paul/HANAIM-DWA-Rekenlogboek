const puppeteer = require('puppeteer')
jest.setTimeout(60000)

describe(`Rekenlogboek`, () => {
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

	afterAll(async () => {})

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
		expect(teams.url()).toBe(teamsIndex)
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

	test(`Enter credentials on Microsot oAuth popup`, async () => {
		const oAuth = await newWindow

		await oAuth.waitForSelector('.tile-img')
		await oAuth.click('.tile-img')

		await oAuth.waitForTimeout(3000)
		expect(oAuth.isClosed()).toBe(true)
	})
})
