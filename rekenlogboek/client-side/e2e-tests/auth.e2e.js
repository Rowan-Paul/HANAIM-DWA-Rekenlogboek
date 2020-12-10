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
			slowMo: 60,
			ignoreHTTPSErrors: true,
			// args: [`--window-size=700,800`, `--window-position=0,0`],
			args: ['--start-maximized'],
			defaultViewport: null
		})
		page = await browser.newPage()
	})

	afterAll(async () => {
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

		// Check if MS is closing
		await oAuth.waitForTimeout(3000)
		expect(oAuth.isClosed()).toBe(true)
	})

	test(`Teacher overview`, async () => {
		await page.click(`.bttn.green`)
		expect(page.url()).toBe(
			'https://localhost:3001/teacher/new-logbook/general'
		)
	})

	test(`Create logbook: Happy path - general`, async () => {
		// Set group
		await page.select('#group', '8')
		const group = await page.$eval('#group', node => node.value)
		expect(group).toStrictEqual('8')

		// Set period
		await page.select('#period', '3')
		const period = await page.$eval('#period', node => node.value)
		expect(period).toStrictEqual('3')

		await page.click(`.next button`)
		expect(page.url()).toBe(
			'https://localhost:3001/teacher/new-logbook/columns'
		)
	})

	test(`Create logbook: Happy path - columns`, async () => {
		const addColumn = async (title, options) => {
			await page.$$eval(`.Plus button`, async plusButtons => {
				plusButtons[0].click()
			})

			expect(`.Modal`).toBeDefined()
			await page.type(`#title`, title)

			for (option of options) {
				await page.type(`#addOption`, option)
				await page.click(`#addBtn`)
			}

			await page.click(`.bttn.blue`)
		}

		await addColumn(`Hoe heb je de toets gemaakt?`, [
			'Ik snap het goed',
			'Ik snap het niet'
		])

		await addColumn(`Heb je instructie nodig?`, [
			'Ik heb instructie nodig',
			'Ik heb geen instructie nodig'
		])

		await page.click(`.next button`)
		expect(page.url()).toBe('https://localhost:3001/teacher/new-logbook/goals')
	})

	test(`Create logbook: Happy path - goals`, async () => {
		// Data
		const goals = [
			{
				title: 'Doel 1',
				description: 'Omschrijving.',
				image: 'temp-goal-thumb.png'
			},
			{
				title: 'Doel 2',
				description: 'Omschrijving.',
				image: 'LearnGoalThumb.png'
			}
		]

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
			const fileHandle = await page.$('input[name=image]')
			await fileHandle.uploadFile('./src/img/temp/' + goal.image)

			// Click add bttn
			await page.waitForSelector('.blue')
			await page.click('.blue')
		}

		// Expect Goal to be added
		expect(page.$('.Goal')).toBeDefined()

		await page.click(`.next button`)
		expect(page.url()).toBe(
			'https://localhost:3001/teacher/new-logbook/overview'
		)
	})

	test(`Create logbook: Happy path - overview`, async () => {
		await page.click(`.next button`)
		expect(page.url()).toBe('https://localhost:3001/teacher/new-logbook/done')
	})
})
