import { test, expect } from "../fixtures/registration.fixtures";
import { registrationTestData } from "../data/registration_test_data";
import { ValidityResult } from "../types/registrationData.type";

test.describe.configure({ mode: "default" });

test.describe("The registration page", async () => {
  for (const { test_name, validity, ...data } of registrationTestData) {
    test(`should check the user registration: ${test_name}`, async ({
      registrationPage,
      page,
    }) => {
      await registrationPage.register(data);

      if (validity.valid) {
        await registrationPage.expectNoValidationErrors();
        await expect(page).toHaveURL(/login/);
      } else {
        for (const key in validity) {
          const isError = validity[key as keyof ValidityResult];
          if (isError) {
            await registrationPage.expectValidationError(
              key as keyof Omit<ValidityResult, "valid">,
            );
          }
        }
      }

      expect(await registrationPage.getValidityResult()).toMatchObject(
        validity,
      );
    });
  }
});
