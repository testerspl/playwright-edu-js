import { expect } from '@playwright/test';
import BasePage from './basePage';
// const BasePage = require('./basePage.ts').BasePage

export class LoginPage extends BasePage {
	// readonly page: Page;

	// constructor(page: Page)
	constructor(url, page) {
		super(url, page);
		// this.page = page;
		this.emailInput = page.locator('#email');
		this.pass = page.locator('#password');
		this.loginBtn = page.locator('#login');
		this.loginForm = page.locator('.front-log');
		this.altLoginFor = page.locator('.front-log>*');
	}

	async login(email, password) {
		await this.emailInput.click();
		await this.emailInput.fill(email);
		await this.pass.click();
		await this.pass.fill(password);
		await this.loginBtn.click();
	}

	async checkLoginForm() {
		// await expect(this.loginForm).toBeVisible();
		const allLoginFormElems = page.$$('.front-log>*');
		await expect(allLoginFormElems[0]).toBeVisible();
	}
}

// export const loginPage = new LoginPage()
