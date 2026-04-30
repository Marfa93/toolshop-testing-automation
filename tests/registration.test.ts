import { test, expect } from "../fixtures/registration.fixtures";
import { registrationTestData } from "../data/registration_test_data";

test.describe("The registration page", async () => {
  for (const { test_name, validity, ...data } of registrationTestData) {
    test(`should check the user registration: ${test_name}`, async ({
      registrationPage,
    }) => {
      await registrationPage.register(data);

      expect(await registrationPage.getValidityResult()).toMatchObject(
        validity,
      );
    });
  }
});
