const puppeteer = require('puppeteer')
jest.setTimeout(30000)

describe(`Open en view logbook group overview`, () => {
	let browser, page
	let newWindow

	const user = {
		email: `bkonijn@teamjaguarundi.onmicrosoft.com`,
		pass: '+h2Mc3N*&$^m7%nB'
	}

	beforeAll(async () => {
		// create two browsers
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 60,
			ignoreHTTPSErrors: true,
			args: ['--start-maximized'],
			defaultViewport: null
		})
		page = await browser.newPage()
	})

	afterAll(async () => await browser.close())

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

		// Check if MS is closing
		await oAuth.waitForTimeout(3000)
		expect(oAuth.isClosed()).toBe(true)
	})

	test(`Group overview`, async () => {
		await page.click(`.bttn.green`)
		expect(page.url()).toBe('https://localhost:3001/teacher/group-overview/')
	})

	test(`Open all answers of first learn goal`, async () => {
		// Select first learngoal
		await page.waitForTimeout(1000)

		await page.click(`.goal_1`)

		expect(page.url()).toBe(
			'https://localhost:3001/teacher/group-overview/answers?goal=0&column=&answer='
		)
	})

	test(`Return to group-overview`, async () => {
		// Select first learngoal
		await page.waitForTimeout(1000)

		await page.click(`.bttn.gray`)
		expect(page.url()).toBe('https://localhost:3001/teacher/group-overview/')
	})
})
