class LoginPage {
	// readonly page: Page;

	// constructor(page: Page)
	constructor(page) {
		this.page = page;
		this.emailInput = page.locator('#email');
		this.pass = page.locator('#password');
		this.loginBtn = page.locator('#login');
	}

    async login(email, password) {
        await this.emailInput.click()
        await this.emailInput.fill(email)
        await this.pass.click()
        await this.pass.fill(password)
        await this.loginBtn.click()
    }
}
