import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MainPage } from '../pages/mainPage';
import { TestBasePage } from '../pages/testBase';

test('has title', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Get started' }).click();
	await expect(page).toHaveURL(/.*intro/);
});

test('check Java page', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Get started' }).click();
	await page.getByRole('button', { name: 'Node.js' }).hover();
	await page.getByText('Java', { exact: true }).click();
	// await page.getByRole('navigation', { name: 'Main' }).getByText('Java').click(); // in case the locator above doesn't work, you can use this line. Remove the line above and use this one instead.
	await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
	await expect(
		page.getByText('Installing Playwright', { exact: true })
	).not.toBeVisible();
	const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
	await expect(page.getByText(javaDescription)).toBeVisible();
});

test('Check login to app', async ({ page }) => {
	const loginPage = new LoginPage('http://demo.testarena.pl/zaloguj', page);
	const mainPage = new MainPage('', page);

	await loginPage.gotoPage();
	await loginPage.login('administrator@testarena.pl', 'sumXQQ72$L');
	await mainPage.checkMainPageElemsAfterLogin();
});

test('Check logout from app', async ({ page }) => {
	const loginPage = new LoginPage('http://demo.testarena.pl/zaloguj', page);
	const mainPage = new MainPage('', page);

	await loginPage.gotoPage();
	await loginPage.login('administrator@testarena.pl', 'sumXQQ72$L');
	await mainPage.logout();
	await loginPage.checkLoginForm();
});

test('Check add test', async ({ page, playwright }) => {
	const loginPage = new LoginPage('http://demo.testarena.pl/zaloguj', page);
	const mainPage = new MainPage('', page);
	const testBasePage = new TestBasePage('', page);

	await loginPage.gotoPage();
	await loginPage.login('administrator@testarena.pl', 'sumXQQ72$L');
	await mainPage.goToTestBase();
	await testBasePage.getTest();
	await testBasePage.fillForm(
		testBasePage.randomString(),
		testBasePage.randomString(),
		testBasePage.randomString()
	);
	await testBasePage.checkAddTest();
});

test('Check api get', async ({ page, request }) => {
	await request.get('https://jsonplaceholder.typicode.com/posts/1', {});
});

test('Check api post', async ({ page, request }) => {
	const response = await request.post(
		'https://jsonplaceholder.typicode.com/posts',
		{
			data: {
				title: 'Post Krzyśka',
				body: 'Treść posta Krzyśka',
				userId: 1,
			},
		}
	);
	console.log(await response.json())
	expect(response.ok()).toBeTruthy();
	expect(await response.json()).toContainEqual(
		expect.objectContaining({
			body: 'Treść posta Krzyśka',
			id: '101',
			title: 'Post Krzyśka',
			userId: 1,
		})
	);
});
