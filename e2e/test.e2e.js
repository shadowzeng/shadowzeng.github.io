const WelcomPage = require('./pageobjects/welcom.page')

describe('application', () => {
    it('should display welcome page', async () => {
        await WelcomPage.open()

        await expect(await ((await WelcomPage.text).getText())).toBe('here')
    })
})


