import { test, expect } from "@playwright/test";
import { parseJSONFile } from "../utils/parseJSONFile";
import { RegistrationPage } from "../pages/registration.page";
import { RegistrationDataSet } from "../types/registrationData.type";

let registrationPage: RegistrationPage;
const registrationDataset: RegistrationDataSet[] = parseJSONFile(
  `${__dirname}/../data/registration_data.json`,
  // `${__dirname}/../data/errors.json`,
);

test.beforeEach(async ({ page }) => {
  registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(5000);
  await page.close();
});

test.describe("The registration page", () => {
  for (const { test_name, validity, ...data } of registrationDataset) {
    test(`should check the user registration: ${test_name}`, async () => {
      await registrationPage.register(data);

      expect(await registrationPage.getValidityResult()).toMatchObject(
        validity,
      );
    });
  }
});
