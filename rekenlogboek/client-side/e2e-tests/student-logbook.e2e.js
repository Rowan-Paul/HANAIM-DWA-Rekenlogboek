const puppeteer = require('puppeteer')
jest.setTimeout(120000)

describe(`Open en view logbook group overview`, () => {
	let teamsBrowser, teams
	let browser, page
	let iframe, newWindow

	const user = {
		email: `bkonijn@teamjaguarundi.onmicrosoft.com`,
		pass: '+h2Mc3N*&$^m7%nB'
	}
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
			args: ['--start-maximized'],
			defaultViewport: null
		})
		page = await browser.newPage()

		teamsBrowser = await puppeteer.launch({
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
		teams = await teamsBrowser.newPage()
	})

	afterAll(async () => {
		await browser.close()
		await teamsBrowser.close()
	})

	test(`Go to main page and login`, async () => {
		await page.goto('https://localhost:3001/')
		// MS button onClick
		const MicrosoftButton = await page.$(`.MicrosoftButton`)
		await MicrosoftButton.click()

		// Store popup
		newWindow = new Promise(x =>
			browser.once('targetcreated', target => x(target.page()))
		)

		expect(MicrosoftButton).toBeDefined()
	})

	test(`Login on Microsoft identity`, async () => {
		// Microsoft identity pop-up
		const oAuth = await newWindow

		// Enter email
		await oAuth.waitForSelector('input[name=loginfmt]')
		await oAuth.type('input[name=loginfmt]', user.email)
		await oAuth.click('input[type=submit]')

		// Enter password
		await oAuth.waitForSelector('input[name=passwd]')
		await oAuth.type('input[name=passwd]', user.pass)
		await oAuth.click('input[type=submit]')

		// Caption: "Aangemeld blijven?" -> click: "Ja"
		await oAuth.waitForSelector('#idSIButton9')
		await oAuth.click('#idSIButton9')

		// Check if MS is closing
		await oAuth.waitForTimeout(3000)
		expect(oAuth.isClosed()).toBe(true)
	})

	test(`Student logbooks`, async () => {
		await page.click(`.bttn.blue`)
		expect(page.url()).toBe('https://localhost:3001/teacher/logbooks')
	})

	test(`Open logbook for student 1`, async () => {
		// Select first learngoal
		await page.waitForTimeout(1000)

		await page.click(`.student-1`)

		expect(page.url()).toBe(
			'https://localhost:3001/teacher/logbooks/studentlogbook'
		)
	})

	test(`Check if happy evaluation smiley isn't checked`, async () => {
		await page.waitForSelector('.goal-1', { visible: true })
		const radiobutton = await page.$('.goal-1 input.Happy')

		const isRadioSelected = await (
			await radiobutton.getProperty('checked')
		).jsonValue()

		expect(isRadioSelected).toBe(false)
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
			teamsBrowser.once('targetcreated', target => x(target.page()))
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

	test(`Set evaluation as happy`, async () => {
		const rekenlogboek = await iframe.contentFrame()

		await rekenlogboek.waitForSelector('.Jumbotron', { visible: true })
		await rekenlogboek.waitForSelector('.Happy')
		await rekenlogboek.click('.Happy div')

		await rekenlogboek.waitForSelector('input.Happy')
		const radiobutton = await rekenlogboek.$('input.Happy')

		const isRadioSelected = await (
			await radiobutton.getProperty('checked')
		).jsonValue()

		expect(isRadioSelected).toBe(true)
	})

	test(`Evaluation smiley after websocket change`, async () => {
		await page.waitForTimeout(5000)
		await page.waitForSelector('.goal-1 input.Happy')
		const radiobutton = await page.$('.goal-1 input.Happy')

		const isRadioSelected = await (
			await radiobutton.getProperty('checked')
		).jsonValue()

		expect(isRadioSelected).toBe(true)
	})

	test(`Set evaluation as sad (reset)`, async () => {
		const rekenlogboek = await iframe.contentFrame()

		await rekenlogboek.waitForSelector('.Jumbotron', { visible: true })
		await rekenlogboek.waitForSelector('.Sad')
		await rekenlogboek.click('.Sad div')

		await rekenlogboek.waitForTimeout(10000)
	})
})
