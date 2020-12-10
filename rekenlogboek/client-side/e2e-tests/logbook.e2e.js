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
			slowMo: 1000,
			ignoreHTTPSErrors: true,
			args: [`--window-size=700,800`, `--window-position=0,0`]
		})
		pageA = await browserA.newPage()
	})

	afterAll(async () => {
		// await browserA.close()
	})

	xtest(`Go to main page and login with microsoft`, async () => {
		await pageA.goto(`https://localhost:3001`)
		const MicrosoftButton = await pageA.$(`.MicrosoftButton`)
		expect(MicrosoftButton).toBeDefined()
		await MicrosoftButton.click()
	})

	xtest(`Login on Microsoft identity`, async () => {
		const newPagePromise = getNewPageWhenLoaded()
		await page.click('my-link') //Opens pop-up window
		const newPage = await newPagePromise
		newPage = newPage.mainFrame()
		const element = await newPage.waitForSelector('img')
		newPage.click(element)
		function getNewPageWhenLoaded() {
			return new Promise(x =>
				browser.once('targetcreated', async target => {
					const newPage = await target.page()
					const newPagePromise = new Promise(() =>
						newPage.once('domcontentloaded', () => x(newPage))
					)
					const isPageLoaded = await newPage.evaluate(() => document.readyState)
					return isPageLoaded.match('complete|interactive')
						? x(newPage)
						: newPagePromise
				})
			)
		}
		// const newPagePromise = new Promise(x =>
		// 	browser.once('targetcreated', target => x(target.page()))
		// )
		// await page.click('#abtn')
		const popup = await newPagePromise
		console.log(popup.url())
		await pageA.waitFor(2000)
		await pageA.type('input[name=loginfmt]', user.email, {
			delay: 50
		})
		await pageA.waitFor(500)
		await pageA.click('input[type=submit]')
		await pageA.waitFor(500)
		await pageA.click('input[name=passwd]')
		await pageA.waitFor(500)
		await pageA.type('input[name=passwd]', user.pass, {
			delay: 50
		})
		await pageA.waitFor(500)
		await pageA.click('input[type=submit]')
	})

	test(`Create logbook - Happy path`, async () => {
		await pageA.goto(`https://localhost:3001/teacher/new-logbook/general`)

		const selectInputs = await pageA.$$eval(`select`, async arr => {
			arr[0].value = '8'
			arr[1].value = '3'
			return arr.map(item => item.value)
		})
		expect(selectInputs).toStrictEqual(['8', '3'])

		await pageA.click(`.next button`)
		await pageA.waitForTimeout(3000)
	})
})
