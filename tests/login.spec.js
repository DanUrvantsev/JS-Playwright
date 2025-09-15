import { test, expect } from "@playwright/test";
const { password, email } = require("../user");

test("authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Пароль" }).fill(password);
  await page.getByRole("textbox", { name: "Пароль" }).press("Enter");
  await page.getByTestId("login-submit-btn").click();
  const iframe = page.frameLocator('[data-testid="advanced-iframe"]');
  await expect(iframe.locator("body")).toContainText(
    /Press in the following order|Нажмите в таком порядке/
  );
});
test("Invalid email", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("email@mail.ru");
  await page.getByRole("textbox", { name: "Пароль" }).click();
  await page.getByRole("textbox", { name: "Пароль" }).fill("Пароль");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText( "Вы ввели неправильно логин или пароль." );
});
