const puppeteer = require('puppeteer')
jest.setTimeout(30000)

describe(`Rekenlogboek`, () => {
	let browserA, pageA

	const user = {
		email: `BKonijn@teamjaguarundi.onmicrosoft.com`,
		pass: 'kFw45@&UNY$qQn@_'
	}

	beforeAll(async () => {
		browserA = await puppeteer.launch({
			headless: false,
			slowMo: 30,
			ignoreHTTPSErrors: true,
			// args: [`--window-size=800,800`, `--window-position=0,0`]
			args: ['--start-maximized'],
			defaultViewport: null
		})
		pageA = await browserA.newPage()
	})

	afterAll(async () => {
		// await browserA.close()
	})

	test(`Create logbook: Happy path - general`, async () => {
		await pageA.goto(`https://localhost:3001/teacher/new-logbook/general`)

		const selectInputs = await pageA.$$eval(`select`, async selectInputs => {
			selectInputs[0].value = '8'
			selectInputs[1].value = '3'
			return selectInputs.map(item => item.value)
		})
		expect(selectInputs).toStrictEqual(['8', '3'])

		await pageA.click(`.next button`)
	})

	test(`Create logbook: Happy path - columns (1)`, async () => {
		const addColumn = async () => {
			await pageA.$$eval(`.Plus button`, async plusButtons => {
				plusButtons[0].click()
			})

			expect(`Modal`).toBeDefined()
			await pageA.type(`#title`, `Hoe heb je de toets gemaakt?`)
			// await pageA.select(`#inputType`, `checkboxes`)

			await pageA.type(`#addOption`, `Ik snap het goed`)
			await pageA.click(`#addBtn`)
			await pageA.type(`#addOption`, `Ik snap het niet`)
			await pageA.click(`#addBtn`)
			await pageA.click(`.bttn.blue`)
		}

		await addColumn()
		await addColumn()

		await pageA.click(`.next button`)
	})
})
