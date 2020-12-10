const puppeteer = require('puppeteer')
jest.setTimeout(30000)

describe(`Rekenlogboek`, () => {
	let browser, page
	let newWindow

	const user = {
		email: `BKonijn@teamjaguarundi.onmicrosoft.com`,
		pass: '+h2Mc3N*&$^m7%nB'
	}

	beforeAll(async () => {
		// create two browsers
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 50,
			ignoreHTTPSErrors: true,
			args: [`--window-size=700,800`, `--window-position=0,0`]
		})
		page = await browser.newPage()
	})

	afterAll(async () => {
		// await browser.close()
	})

	xtest(`Go to main page and login`, async () => {
		await page.goto(`https://localhost:3001/`)

		// MS button onClick
		const MicrosoftButton = await page.$(`.MicrosoftButton`)
		await MicrosoftButton.click()

		// Store popup
		newWindow = new Promise(x =>
			browser.once('targetcreated', target => x(target.page()))
		)

		expect(MicrosoftButton).toBeDefined()
	})

	xtest(`Login on Microsoft identity`, async () => {
		// Microsoft identity tab
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

	test(`Goals page`, async () => {
		// Data
		const goals = [
			{
				title: 'Doel 1',
				description: 'Omschrijving.'
			},
			{
				title: 'Doel 2',
				description: 'Omschrijving.'
			}
		]
		// Temporary (will removed after merge with stefs class)
		await page.goto(`https://localhost:3001/teacher/new-logbook/goals`)

		for (let goal of goals) {
			// Wait for 'ADD goal' button and click
			await page.waitForSelector('.fa-plus', { visible: true })
			await page.click('.fa-plus')

			// Fill in title
			await page.waitForSelector('input[name=title]')
			await page.type('input[name=title]', goal.title)

			// Fill in description
			await page.waitForSelector('textarea[name=description]')
			await page.type('textarea[name=description]', goal.description)

			// Add image
			// const fileHandle = await page.$('input[name=image]')
			// await fileHandle.uploadFile('./temp-goal-thumb.png')

			// Click add bttn
			await page.waitForSelector('.blue')
			await page.click('.blue')
		}

		// Expect Goal to be added
		expect(page.$('.Goal')).toBeDefined()

		// Click next button
		await page.waitForSelector('.blue')
		await page.click('.blue')

		await page.waitForTimeout(2000)
	})
})
