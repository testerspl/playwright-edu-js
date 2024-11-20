import { expect } from '@playwright/test';
import BasePage from './basePage';
// const BasePage = require('./basePage.ts').BasePage

export class TestBasePage extends BasePage {
	// readonly page: Page;

	// constructor(page: Page)
	constructor(url, page) {
		super(url, page);
		// this.page = page;
		this.testInfoSelector = '#j_info_box';
		this.add = page.locator('#content > article > nav > ul > div > a');
		this.formName = page.locator('#name');
		this.formDsc = page.locator('#description');
		this.formRes = page.locator('#result');
		this.formSave = page.locator('#add');
		this.infoBox = page.locator(this.testInfoSelector);
		this.testList = page.locator(
			'#content > article > nav > ul > div > div > ul>*'
		);
	}

	async getTest(option = 'Przypadek testowy') {
		await this.add.click();
		this.option = option;
		await this.testList.getByText(this.option).click();
	}

	async fillForm(
		formName = 'afaef',
		description = 'eafaefa',
		result = 'fqaefa'
	) {
		await this.formName.fill(formName);
		await this.formDsc.fill(description);
		await this.formRes.fill(result);
		await this.formSave.click();
	}

	async checkAddTest() {
        await this.page.waitForSelector(this.testInfoSelector)
		await expect(this.infoBox).toBeVisible();
		// await expect(this.infoBox).toHaveText('Przypadek testowy został dodany.');
		this.assertElementText(this.infoBox, 'Przypadek testowy został dodany.')
	}
}

// export const loginPage = new LoginPage()
