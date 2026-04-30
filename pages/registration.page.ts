import { Page, Locator, expect } from "@playwright/test";
import {
  RegistrationData,
  ValidityResult,
} from "../types/registrationData.type";

export class RegistrationPage {
  private readonly page: Page;
  // === URL ===
  private readonly url: string =
    "https://practicesoftwaretesting.com/auth/register";

  // === Locators - Champs du formulaire ===
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dobInput: Locator;
  private readonly countrySelect: Locator;
  private readonly postalCodeInput: Locator;
  private readonly houseNumberInput: Locator;
  private readonly streetInput: Locator; // Auto-rempli
  private readonly cityInput: Locator; // Auto-rempli
  private readonly stateInput: Locator; // Auto-rempli
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  // === Locators - Messages d'erreur ===
  private readonly firstNameError: Locator;
  private readonly lastNameError: Locator;
  private readonly dobError: Locator;
  private readonly countryError: Locator;
  private readonly postalCodeError: Locator;
  private readonly houseNumberError: Locator;
  private readonly streetError: Locator;
  private readonly cityError: Locator;
  private readonly stateError: Locator;
  private readonly phoneError: Locator;
  private readonly emailError: Locator;
  private readonly passwordError: Locator;
  private readonly registrationError: Locator; // Erreur globale (email dupliqué, etc.)

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("input#first_name");
    this.lastNameInput = page.locator("input#last_name");
    this.dobInput = page.locator("input#dob");
    this.countrySelect = page.locator("select#country");
    this.postalCodeInput = page.locator("input#postal_code");
    this.houseNumberInput = page.locator("input#house_number");
    this.streetInput = page.locator("input#street");
    this.cityInput = page.locator("input#city");
    this.stateInput = page.locator("input#state");
    this.phoneInput = page.locator("input#phone");
    this.emailInput = page.locator("input#email");
    this.passwordInput = page.locator("input#password");

    // Bouton
    this.submitButton = page.locator("button.btnSubmit[type='submit']");

    // Messages d'erreur - adaptatifs selon l'implémentation du site
    this.firstNameError = page.locator("div#first_name-error");
    this.lastNameError = page.locator("div#last_name-error");
    this.dobError = page.locator("div#dob-error");
    this.countryError = page.locator("div#country-error");
    this.postalCodeError = page.locator("div#postal_code-error");
    this.houseNumberError = page.locator("div[data-test='house_number-error']");
    this.streetError = page.locator("div#street-error");
    this.cityError = page.locator("div#city-error");
    this.stateError = page.locator("div#state-error");
    this.phoneError = page.locator("div#phone-error");
    this.emailError = page.locator("div#email-error");
    this.passwordError = page.locator("div#password-error");
    this.registrationError = page.locator("div[data-test='register-error']");
  }

  // === Navigation ===
  async goto() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
    await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
  }

  // === Actions - Remplissage du formulaire ===
  async fillFirstName(value: string) {
    await this.firstNameInput.fill(value);
  }

  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  async fillDateOfBirth(value: string) {
    await this.dobInput.fill(value);
  }

  async selectCountry(value: string) {
    await this.countrySelect.selectOption({ label: value });
  }

  async fillPostalCode(value: string) {
    await this.postalCodeInput.fill(value);
  }

  async fillHouseNumber(value: string) {
    await this.houseNumberInput.fill(value);
  }

  async fillStreet(value: string) {
    await this.streetInput.fill(value);
  }

  async fillCity(value: string) {
    await this.cityInput.fill(value);
  }

  async fillState(value: string) {
    await this.stateInput.fill(value);
  }

  async fillPhone(value: string) {
    await this.phoneInput.fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  /**
   * Remplit tout le formulaire avec un objet de données
   */
  async fillForm(data: Partial<RegistrationData>) {
    await this.fillFirstName(data.first_name ?? "");
    await this.fillLastName(data.last_name ?? "");
    await this.fillDateOfBirth(data.date_of_birth ?? "");
    if (data.country && data.country !== "") {
      await this.selectCountry(data.country);
    }
    await this.fillPostalCode(data.postal_code ?? "");
    await this.fillHouseNumber(data.house_number ?? "");
    await this.fillStreet(data.street ?? "");
    await this.fillCity(data.city ?? "");
    await this.fillState(data.state ?? "");
    await this.fillPhone(data.phone ?? "");
    await this.fillEmail(data.email ?? "");
    await this.fillPassword(data.password ?? "");
  }

  /**
   * Soumet le formulaire
   */
  async submit() {
    await this.submitButton.click();
    await this.page.waitForLoadState("networkidle");
    await this.expectValidationError("registration_error").catch(() => false);
  }

  /**
   * Remplit et soumet en une seule méthode (utile pour les tests nominaux)
   */
  async register(data: RegistrationData) {
    await this.fillForm(data);
    await this.submit();
  }

  // === Vérifications - Messages d'erreur ===
  async isFirstNameErrorVisible(): Promise<boolean> {
    return await this.firstNameError.isVisible().catch(() => false);
  }

  async isLastNameErrorVisible(): Promise<boolean> {
    return await this.lastNameError.isVisible().catch(() => false);
  }

  async isDobErrorVisible(): Promise<boolean> {
    return await this.dobError.isVisible().catch(() => false);
  }

  async isCountryErrorVisible(): Promise<boolean> {
    return await this.countryError.isVisible().catch(() => false);
  }

  async isPostalCodeErrorVisible(): Promise<boolean> {
    return await this.postalCodeError.isVisible().catch(() => false);
  }

  async isHouseNumberErrorVisible(): Promise<boolean> {
    return await this.houseNumberError.isVisible().catch(() => false);
  }

  async isStreetErrorVisible(): Promise<boolean> {
    return await this.streetError.isVisible().catch(() => false);
  }

  async isCityErrorVisible(): Promise<boolean> {
    return await this.cityError.isVisible().catch(() => false);
  }

  async isStateErrorVisible(): Promise<boolean> {
    return await this.stateError.isVisible().catch(() => false);
  }

  async isPhoneErrorVisible(): Promise<boolean> {
    return await this.phoneError.isVisible().catch(() => false);
  }

  async isEmailErrorVisible(): Promise<boolean> {
    return await this.emailError.isVisible().catch(() => false);
  }

  async isPasswordErrorVisible(): Promise<boolean> {
    return await this.passwordError.isVisible().catch(() => false);
  }

  async isRegistrationErrorVisible(): Promise<boolean> {
    await expect(this.registrationError)
      .toBeVisible()
      .catch(() => false);
    return await this.registrationError.isVisible().catch(() => false);
  }

  /**
   * Retourne l'objet de validité correspondant à la structure JSON demandée
   */
  async getValidityResult(): Promise<ValidityResult> {
    const errors: Omit<ValidityResult, "valid"> = {
      first_name_error: await this.isFirstNameErrorVisible(),
      last_name_error: await this.isLastNameErrorVisible(),
      dob_error: await this.isDobErrorVisible(),
      country_error: await this.isCountryErrorVisible(),
      postal_code_error: await this.isPostalCodeErrorVisible(),
      house_number_error: await this.isHouseNumberErrorVisible(),
      street_error: await this.isStreetErrorVisible(),
      city_error: await this.isCityErrorVisible(),
      state_error: await this.isStateErrorVisible(),
      phone_error: await this.isPhoneErrorVisible(),
      email_error: await this.isEmailErrorVisible(),
      password_error: await this.isPasswordErrorVisible(),
      registration_error: await this.isRegistrationErrorVisible(),
    };

    const hasAnyError = Object.values(errors).some(Boolean);

    return {
      valid: !hasAnyError,
      ...errors,
    };
  }

  // === Assertions utilitaires (optionnel, pour gagner du temps dans les tests) ===
  // async expectSuccessRedirect() {
  //   await expect(this.page).toHaveURL(/dashboard|profile|welcome/i, {
  //     timeout: 10000,
  //   });
  // }

  async expectValidationError(field: keyof Omit<ValidityResult, "valid">) {
    const errorLocator = {
      first_name_error: this.firstNameError,
      last_name_error: this.lastNameError,
      dob_error: this.dobError,
      country_error: this.countryError,
      postal_code_error: this.postalCodeError,
      house_number_error: this.houseNumberError,
      city_error: this.cityError,
      street_error: this.streetError,
      state_error: this.stateError,
      phone_error: this.phoneError,
      email_error: this.emailError,
      password_error: this.passwordError,
      registration_error: this.registrationError,
    }[field];

    await expect(errorLocator).toBeVisible({ timeout: 2000 });
  }

  async expectNoValidationErrors() {
    const errorLocators = [
      this.firstNameError,
      this.lastNameError,
      this.dobError,
      this.countryError,
      this.postalCodeError,
      this.houseNumberError,
      this.streetError,
      this.cityError,
      this.stateError,
      this.phoneError,
      this.emailError,
      this.passwordError,
      this.registrationError,
    ];

    for (const locator of errorLocators) {
      await expect(locator).not.toBeVisible();
    }
  }
}
