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
			slowMo: 50,
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

	xtest(`Create logbook: Happy path - columns`, async () => {
		const addColumn = async () => {
			await page.$$eval(`.Plus button`, async plusButtons => {
				plusButtons[0].click()
			})

			expect(page.$(`.Modal`)).toBeDefined()
			await page.type(`#title`, `Hoe heb je de toets gemaakt?`)
			// await page.select(`#inputType`, `checkboxes`)

			await page.type(`#addOption`, `Ik snap het goed`)
			await page.click(`#addBtn`)
			await page.type(`#addOption`, `Ik snap het niet`)
			await page.click(`#addBtn`)

			await page.click(`.bttn.blue`)

			await page.waitForTimeout(1000)
		}

		await addColumn()
		await addColumn()

		await page.click(`.next button`)
		expect(page.url()).toBe('https://localhost:3001/teacher/new-logbook/goals')
	})

	xtest(`Create logbook: Happy path - overview`, async () => {
		// Temporary (will removed after merge with Michaels class)
		await page.goto('https://localhost:3001/teacher/new-logbook/overview')
		await page.click(`.next button`)

		expect(page.url()).toBe('https://localhost:3001/teacher/new-logbook/done')
	})
})
