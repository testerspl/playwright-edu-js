import { expect } from '@playwright/test';
import BasePage from './basePage';
// const BasePage = require('./basePage.ts').BasePage

export class MainPage extends BasePage {
	// readonly page: Page;

	// constructor(page: Page)
	constructor(url, page) {
		super(url, page);
		// this.page = page;
		this.myTasks = page.locator(
			'#content > article > article:nth-child(2) > div:nth-child(1) > article > div'
		);
		this.logoutBtn = page.locator('.icons-switch');
		this.goToTestBaseSelector = page.locator('#wrapper > ul > li.item5 > a');
	}

	async logout() {
		try {
			await this.logoutBtn.click();
		} catch (ex) {
			console.log(`Function logout error:
			selector: ${this.myTasks}
			error: ${ex}`);
		}
	}

	async checkMainPageElemsAfterLogin() {
		await expect(this.myTasks).toBeVisible();
	}

	async goToTestBase() {
		await this.goToTestBaseSelector.click();
	}
}

// export const loginPage = new LoginPage()
