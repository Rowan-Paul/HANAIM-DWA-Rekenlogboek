const puppeteer = require('puppeteer')

jest.setTimeout(30000)

describe(`Rekenlogboek`, () => {
	// let browserA, pageA
	let browserB, pageB

	const user = {
		email: `BKonijn@teamjaguarundi.onmicrosoft.com`,
		pass: 'kFw45@&UNY$qQn@_'
	}

	beforeAll(async () => {
		// create two browsers
		// browserA = await puppeteer.launch({
		// 	headless: false,
		// 	slowMo: 200,
		// 	ignoreHTTPSErrors: true,
		// 	args: [`--window-size=700,800`, `--window-position=0,0`]
		// })
		// pageA = await browserA.newPage()

		browserB = await puppeteer.launch({
			headless: false,
			slowMo: 400,
			ignoreHTTPSErrors: true,
			args: [`--window-size=700,800`, `--window-position=250,0`]
		})
		pageB = await browserB.newPage()
	})

	afterAll(async () => {
		// await browserA.close()
		// await browserB.close()
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
		await pageB.goto(`https://localhost:3001/teacher/new-logbook/general`)

		// let group, period

		const selectInputs = await pageB.$$eval(`select`, async arr => {
			return arr.map(item => item.value)
		})
		expect(selectInputs).toStrictEqual(['5', '1'])

		// group = await arr[0]
		// await group.select('7')
		// period = await arr[1]
		// await period.select('3')

		// const groupValue = await group.getProperty('textContent')
		// expect(groupValue).toBe('7')

		// const periodValue = await period.getProperty('textContent')
		// expect(periodValue).toBe('3')
	})
})
