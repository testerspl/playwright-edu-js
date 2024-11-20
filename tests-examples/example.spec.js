import { expect, test } from '@playwright/test';
import { Chance } from 'chance';
import { LoginPage } from '../pages/loginPage';
import { MainPage } from '../pages/mainPage';
import { TestBasePage } from '../pages/testBase';
let chance;

test.beforeEach('Example of Chance use', async ({ page }) => {
	console.log(`Running chance`);
	chance = new Chance();
});

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

test.only('Check add test', async ({ page, playwright }) => {
	const loginPage = new LoginPage('http://demo.testarena.pl/zaloguj', page);
	const mainPage = new MainPage('', page);
	const testBasePage = new TestBasePage('', page);

	await loginPage.gotoPage();
	await loginPage.login('administrator@testarena.pl', 'sumXQQ72$L');
	await mainPage.goToTestBase();
	await testBasePage.getTest();
	await testBasePage.fillForm(
		chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
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
	console.log(await response.json());
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

test('Check Add object', async ({ page, request }) => {
	let computerData = {
		year: 2022,
		price: 0,
		'CPU model': 'Intel Core i7',
		'Hard disk size':
			'4 dyski - SSD na system + HDD na dokumenty i inne + 2xSSD M2 (Po 2 TB) na gry, emulatory i podobne',
		RAM: 'Patriot Viper Steel RGB, DDR4, 32 GB, 3200MHz, CL16',
		Chłodzenie: 'Noctua NH-U12A chromax.black',
	};
	const response = await request.post('https://api.restful-api.dev/objects', {
		data: {
			name: 'Window 11 PRO - Sam składam komputer',
			data: computerData,
		},
	});
	expect(response.ok()).toBeTruthy();
	const rsponseJson = await response.json();
	if (rsponseJson != null && rsponseJson.constructor.name === 'Object') {
		expect(rsponseJson).toHaveProperty('id');
		expect(rsponseJson).toHaveProperty('name');
		expect(rsponseJson).toHaveProperty('createdAt');
		expect(rsponseJson).toHaveProperty('data');

		const { id, name, data } = rsponseJson;

		expect(typeof id === 'string').toBeTruthy();
		expect(typeof name === 'string').toBeTruthy();
		expect(typeof data === 'object').toBeTruthy();

		expect(data.year === computerData.year).toBeTruthy();
		expect(data.price === computerData.price).toBeTruthy();
		expect(data['CPU model'] === computerData['CPU model']).toBeTruthy();
		expect(
			data['Hard disk size'] === computerData['Hard disk size']
		).toBeTruthy();
		expect(data.RAM === computerData.RAM).toBeTruthy();
		expect(data.Chłodzenie === computerData.Chłodzenie).toBeTruthy();
	} else {
		throw Error(`Response is not a JSON object:
		Response : ${rsponseJson}`);
	}
});
