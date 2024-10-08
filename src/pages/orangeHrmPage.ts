import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import config = require('../../config.json'); // Import the JSON config file
import logger from '../../logger'; // Import the logger File

export default class OrangeHrmPage {
  private base: PlaywrightWrapper;
  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private orangeHrmPageElements = {
    loginusername: "//input[@name='username']",
    loginpasswird: "//input[@name='password']",
    loginbutton: "//button[contains(@class,'orangehrm-login-button')]",
    orangeHrmLogo: "//img[@alt='client brand banner']",
    adminSideBarOption: "//span[text()='Admin']",
    addUserButton: "//button[normalize-space()='Add']",
    userRoleDropdown: "//div[@class='oxd-select-text oxd-select-text--active']",
    employeeNameTextbox: "//input[@placeholder='Type for hints...']",
    commonInputBox: "//input[@class='oxd-input oxd-input--active']",
    commonPasswordBox:
      "//div[@class='oxd-form-row user-password-row']//input[@class='oxd-input oxd-input--active']",
    confirmPasswordBox:
      "//div[@class='oxd-form-row user-password-row']//input[@class='oxd-input oxd-input--focus']",
    saveButton: "//button[normalize-space()='Save']",
    searchButton: "//button[normalize-space()='Search']",
  };

  async navigateToOrangeHRMPage() {
    await this.base.goto(config.OrangeHRMUrl);
  }

  async sleepForTime(time: string) {
    const timewait = parseInt(time);
    await this.base.sleepAndWait(timewait * 1000);
  }

  async enterUsername(Username: string) {
    await this.page
      .locator(this.orangeHrmPageElements.loginusername)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page.locator(this.orangeHrmPageElements.loginusername).clear();
    await this.page.fill(this.orangeHrmPageElements.loginusername, Username);
  }

  async enterPassword(Password: string) {
    await this.page
      .locator(this.orangeHrmPageElements.loginpasswird)
      .waitFor({ state: 'visible', timeout: 30000 });
    await this.page.locator(this.orangeHrmPageElements.loginpasswird).clear();
    await this.page.fill(this.orangeHrmPageElements.loginpasswird, Password);
  }

  async clickSubmitButton() {
    await this.page
      .locator(this.orangeHrmPageElements.loginbutton)
      .waitFor({ state: 'visible', timeout: 30000 });
    await this.page.locator(this.orangeHrmPageElements.loginbutton).isVisible();
    await this.page.locator(this.orangeHrmPageElements.loginbutton).isEnabled();
    await this.page
      .locator(this.orangeHrmPageElements.loginbutton)
      .scrollIntoViewIfNeeded();
    await this.page.locator(this.orangeHrmPageElements.loginbutton).click();
  }

  async validateHRMLogo() {
    await this.page
      .locator(this.orangeHrmPageElements.orangeHrmLogo)
      .waitFor({ state: 'visible', timeout: 30000 });
    await expect(
      this.page.locator(this.orangeHrmPageElements.orangeHrmLogo)
    ).toHaveAttribute('src', '/web/images/orangehrm-logo.png?v=1721393199309');
  }
  async clickAdminButton() {
    await this.page
      .locator(this.orangeHrmPageElements.adminSideBarOption)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.adminSideBarOption)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.adminSideBarOption)
      .click();
  }

  async verifyAddButtonVisible() {
    await this.page
      .locator(this.orangeHrmPageElements.addUserButton)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.addUserButton)
      .scrollIntoViewIfNeeded();
    await expect(
      this.page.locator(this.orangeHrmPageElements.addUserButton)
    ).toBeVisible();
  }

  async clickAddUserButton() {
    await this.page
      .locator(this.orangeHrmPageElements.addUserButton)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.addUserButton)
      .scrollIntoViewIfNeeded();
    await this.page.locator(this.orangeHrmPageElements.addUserButton).click();
  }

  async selectUserRole(RoleSelect: string) {
    await this.page
      .locator(this.orangeHrmPageElements.userRoleDropdown)
      .nth(0)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.userRoleDropdown)
      .nth(0)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.userRoleDropdown)
      .nth(0)
      .click();
    await this.page.locator(`xpath=//span[text()="${RoleSelect}"]`).hover();
    await this.page.locator(`xpath=//span[text()="${RoleSelect}"]`).click();
  }

  async selectStatus(RoleStatus: string) {
    await this.page
      .locator(this.orangeHrmPageElements.userRoleDropdown)
      .nth(1)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.userRoleDropdown)
      .nth(1)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.userRoleDropdown)
      .nth(1)
      .click();
    await this.page.locator(`xpath=//span[text()="${RoleStatus}"]`).hover();
    await this.page.locator(`xpath=//span[text()="${RoleStatus}"]`).click();
  }

  async selectRoleForUser(usersName: string) {
    await this.page
      .locator(this.orangeHrmPageElements.employeeNameTextbox)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page.fill(
      this.orangeHrmPageElements.employeeNameTextbox,
      usersName
    );
    await this.page
      .locator(`text="${usersName}"`)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page.locator(`text="${usersName}"`).hover();
    await this.page.locator(`text="${usersName}"`).click();
  }

  async enterUsersNameinUserManagement(usersName: string) {
    process.env.RANDOM_USERNAME = usersName;
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .nth(1)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .nth(1)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .nth(1)
      .fill(usersName);
  }

  async enterUsersPassword(userPass: string) {
    await this.page
      .locator(this.orangeHrmPageElements.commonPasswordBox)
      .nth(0)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.commonPasswordBox)
      .nth(0)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.commonPasswordBox)
      .nth(0)
      .fill(userPass);
  }

  async reconfirmUsersPassword(reconfirmPass: string) {
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .last()
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .last()
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .last()
      .fill(reconfirmPass);
  }

  async clickOnSaveButton() {
    await this.page
      .locator(this.orangeHrmPageElements.saveButton)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.saveButton)
      .scrollIntoViewIfNeeded();
    await this.page.locator(this.orangeHrmPageElements.saveButton).click();
  }

  async searchTheCreatedUserName() {
    const savedValue = process.env.RANDOM_USERNAME;
    logger.info(savedValue);
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .nth(1)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .nth(1)
      .scrollIntoViewIfNeeded();
    await this.page
      .locator(this.orangeHrmPageElements.commonInputBox)
      .nth(1)
      .fill(savedValue);
    await this.page
      .locator(this.orangeHrmPageElements.searchButton)
      .waitFor({ state: 'visible', timeout: 60000 });
    await this.page.locator(this.orangeHrmPageElements.searchButton).click();
  }

  async verifyUserCreated() {
    const savedValue = process.env.RANDOM_USERNAME;
    logger.info(savedValue);
    await expect(
      await this.page.locator(`//div[contains(text(),'${savedValue}')]`)
    ).toBeVisible();
  }
}
