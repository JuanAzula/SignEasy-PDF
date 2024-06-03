import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const USERNAME = 'admin';
const USER_PASSWORD = '1337';

test('Authenticate', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole('button', { name: 'Sign PDF' }).click();
  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Pin').fill(USER_PASSWORD);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'src/tests/screenshots/login.png' });
});

test('Save signature', async ({ page }) => {
  await page.goto(`${BASE_URL}/signature`);
  await page.getByRole('button', { name: 'save' }).click();
  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Pin').fill(USER_PASSWORD);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'save' }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'src/tests/screenshots/signature.png' });
});
