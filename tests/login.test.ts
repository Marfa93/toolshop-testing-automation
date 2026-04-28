import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { parseJSONFile } from "../utils/parseJSONFile";
import { LoginDataSet } from "../types/loginDataSet.type";

let loginPage: LoginPage;
const loginsDataset: LoginDataSet[] = parseJSONFile(
  `${__dirname}/../data/login_data.json`,
);

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("The login page", () => {
  for (const { email, password, test_name, validity } of loginsDataset) {
    test(`should check the user credentials: ${test_name}`, async ({
      page,
    }) => {
      await loginPage.login({ email, password });

      if (validity.valid) {
        await expect(page).toHaveURL(/account/);
      }

      if (!validity.valid) {
        if (validity.email_error) {
          await expect(loginPage.emailErrorBlock).toBeVisible();
          await expect(loginPage.loginErrorBlock).not.toBeVisible();
        }

        if (validity.password_error) {
          await expect(loginPage.passwordErrorBlock).toBeVisible();
          await expect(loginPage.loginErrorBlock).not.toBeVisible();
        }

        if (validity.login_error) {
          await expect(loginPage.loginErrorBlock).toBeVisible();
          await expect(loginPage.emailErrorBlock).not.toBeVisible();
          await expect(loginPage.passwordErrorBlock).not.toBeVisible();
        }
      }
    });
  }
});
