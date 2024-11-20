import { expect, type Page } from '@playwright/test';

export default class BasePage {
	readonly page: Page;
	readonly url: string;

	constructor(url: string, page: Page) {
		this.page = page;
		this.url = url;
	}

	async gotoPage() {
		await this.page.goto(this.url);
	}

	async assertElementText(selector: string, textToHave: string) {
		expect(this.page.locator(selector)).toHaveText(textToHave);
	}

	async getAllElements(selector) {
		await this.page.evaluate(
			(selector) => document.querySelectorAll(selector),
			selector
		);
	}

	randomString(len: number = 10, type: string = 'letters') {
		type = type && type.toLowerCase();
		let str = '',
			i = 0,
			min = type == 'letters' ? 10 : 0,
			max = type == 'number' ? 10 : 62;
		for (; i++ < len; ) {
			let r = (Math.random() * (max - min) + min) << 0;
			str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
		}
		return str;
	}

	async mouseDbClick(selector) {
		await this.page.locator(selector).dblclick();
	}

	async hoverElem(selector) {
		await this.page.locator(selector).hover();
	}

	async clickByPosition(selector, xPos, yPos) {
		await this.page.locator(selector).click({ position: { x: xPos, y: yPos } });
	}

	async pressSequentially(selector, text = 'Hello World!') {
		await this.page.locator(selector).pressSequentially(text);
	}

	async useKeys(selector, pressKey) {
		await this.page.locator(selector).press(pressKey);
	}

	async dragAndDropElem(selectorDragged, selectorAt) {
		await this.page
			.locator(selectorDragged)
			.dragTo(this.page.locator(selectorAt));
	}

	async dragAndDropManually(selectorDragged, selectorAt) {
		await this.page.locator(selectorDragged).hover();
		await this.page.mouse.down();
		await this.page.locator(selectorAt).hover();
		await this.page.mouse.up();
	}

	async scrollingByWheel(selector, scrollFrom, scrollTo) {
		await this.page.getByTestId(selector).hover();
		await this.page.mouse.wheel(scrollFrom, scrollTo);
	}
}

// new BasePage().useKeys('selector', 'Enter')
// new BasePage().useKeys('selector', 'Control+ArrowRight')
