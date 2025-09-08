import { test, expect } from '@playwright/test';
const {password, email} = require ("../user");

test('test', async ({ page }) => {
  await page.goto('https://netology.ru/profile');
  await page.getByRole('link', { name: 'Авторизоваться' }).click();
  await page.getByText('Войти по почте').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  await page.getByRole('textbox', { name: 'Пароль' }).press('Enter');
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL('https://netology.ru/profile/9564287');
});
