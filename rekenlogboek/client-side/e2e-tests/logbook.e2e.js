const puppeteer = require('puppeteer')
jest.setTimeout(30000)

describe(`Rekenlogboek`, () => {
	let browser, page

	const user = {
		email: `BKonijn@teamjaguarundi.onmicrosoft.com`,
		pass: 'kFw45@&UNY$qQn@_'
	}

	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			ignoreHTTPSErrors: true,
			// args: [`--window-size=800,800`, `--window-position=0,0`]
			args: ['--start-maximized'],
			defaultViewport: null
		})
		page = await browser.newPage()
	})

	afterAll(async () => {
		// await browser.close()
	})

	test(`Create logbook: Happy path - general`, async () => {
		await page.goto(`https://localhost:3001/teacher/new-logbook/general`)

		const selectInputs = await page.$$eval(`select`, async selectInputs => {
			selectInputs[0].value = '8'
			selectInputs[1].value = '3'
			return selectInputs.map(item => item.value)
		})

		// await page.select(`form:first-child .select`, '8')
		// await page.select(`form:last-child .select`, '3')

		expect(selectInputs).toStrictEqual(['8', '3'])

		await page.click(`.next button`)
		expect(page.url()).toBe(
			'https://localhost:3001/teacher/new-logbook/columns'
		)
	})

	test(`Create logbook: Happy path - columns`, async () => {
		const addColumn = async () => {
			await page.$$eval(`.Plus button`, async plusButtons => {
				plusButtons[0].click()
			})

			expect(`.Modal`).toBeDefined()
			await page.type(`#title`, `Hoe heb je de toets gemaakt?`)
			// await page.select(`#inputType`, `checkboxes`)

			await page.type(`#addOption`, `Ik snap het goed`)
			await page.click(`#addBtn`)
			await page.type(`#addOption`, `Ik snap het niet`)
			await page.click(`#addBtn`)
			await page.click(`.bttn.blue`)
		}

		await addColumn()
		await addColumn()

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

		// Click next button
		await page.waitForSelector('.blue')
		await page.click('.blue')

		await page.waitForTimeout(2000)

		await page.click(`.next button`)
		expect(page.url()).toBe(
			'https://localhost:3001/teacher/new-logbook/overview'
		)
	})

	xtest(`Create logbook: Happy path - overview`, async () => {
		// await page.click(`.next button`)
		// expect(page.url()).toBe('https://localhost:3001/teacher/new-logbook/done')
	})
})
