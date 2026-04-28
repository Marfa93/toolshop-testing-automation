import { Locator, Page } from "@playwright/test";
import { TestConfig } from "../test.config";

export class LoginPage {
  private readonly _emailErrorBlock: Locator;
  private readonly emailField: Locator;
  private readonly loginButton: Locator;
  private readonly _loginErrorBlock: Locator;
  private readonly page: Page;
  private readonly _passwordErrorBlock: Locator;
  private readonly passwordField: Locator;
  private readonly url: string;

  public constructor(page: Page) {
    this.page = page;
    const config = new TestConfig();
    this.url = `${config.appUrl}/auth/login`;

    this.emailField = page.locator("input#email");
    this.passwordField = page.locator("input#password");
    this.loginButton = page.getByLabel("Login", { exact: true });
    this._emailErrorBlock = page.locator("div#email-error");
    this._passwordErrorBlock = page.locator("div#password-error");
    this._loginErrorBlock = page.locator("div[data-test='login-error']");
  }

  public async goto() {
    await this.page.goto(this.url, { waitUntil: "networkidle" });
  }

  public async setEmail(email: string) {
    await this.emailField.fill(email);
  }

  public async setPassword(password: string) {
    await this.passwordField.fill(password);
  }

  public async clickLoginButton() {
    await this.loginButton.click();
  }

  public async login({ email, password }: { email: string; password: string }) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLoginButton();
  }

  public get emailErrorBlock(): Locator {
    return this._emailErrorBlock;
  }

  public get passwordErrorBlock(): Locator {
    return this._passwordErrorBlock;
  }

  public get loginErrorBlock(): Locator {
    return this._loginErrorBlock;
  }
}
