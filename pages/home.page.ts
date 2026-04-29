import { Locator, Page } from "@playwright/test";
import { Language } from "../types/language.type";

export class HomePage {
  private readonly displayedProducts: Locator;
  private readonly _selectLanguageButton: Locator;
  private readonly loginLink: Locator;
  private readonly page: Page;
  private readonly toolShopLogo: Locator;
  private readonly url: string;

  public constructor(page: Page) {
    this.page = page;
    this.url = "";
    this.toolShopLogo = page.getByTitle("Toolshop");
    this._selectLanguageButton = page.getByLabel("Select language");
    this.displayedProducts = page.locator("a.card");
    this.loginLink = page.locator("a[routerlink='/auth/login']");
  }

  public async goto() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
  }

  public async isLogoVisible() {
    return await this.toolShopLogo.isVisible();
  }

  public async countDisplayedProducts() {
    return await this.displayedProducts.count();
  }

  public async selectLanguage(language: Language) {
    await this._selectLanguageButton.click();
    await this.page.locator(`a.dropdown-item:has-text("${language}")`).click();
  }

  public async clickOnLogin() {
    await this.loginLink.click();
  }

  public get selectLanguageButton(): Locator {
    return this._selectLanguageButton;
  }
}
