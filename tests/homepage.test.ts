import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("The home page", () => {
  test("should display the logo", async () => {
    expect(await homePage.isLogoVisible()).toBe(true);
  });

  test("should display 9 products by default", async () => {
    expect(await homePage.countDisplayedProducts()).toBe(9);
  });

  test("the language can be changed", async () => {
    const userLanguage = "FR";
    await homePage.selectLanguage(userLanguage);
    const buttonText = (await homePage.selectLanguageButton.innerText()).trim();
    expect(buttonText).toBe(userLanguage);
  });

  test("should redirect to the login page after click", async ({ page }) => {
    await homePage.clickOnLogin();
    await expect(page).toHaveURL(/login/);
  });
});
