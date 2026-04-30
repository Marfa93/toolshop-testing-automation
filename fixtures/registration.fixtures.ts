import { test as base, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/registration.page";

/**
 * Définition des fixtures étendues pour les tests d'enregistrement
 */
export type RegistrationFixtures = {
  registrationPage: RegistrationPage;
};

/**
 * Extension du test Playwright avec nos fixtures personnalisées
 */
export const test = base.extend<RegistrationFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await use(registrationPage);
  },
});

export { expect };
