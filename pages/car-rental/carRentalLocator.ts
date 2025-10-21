import { Page, Locator } from '@playwright/test'

export class CarRentalLocator{
    readonly page: Page;
    readonly inputPlace: Locator;
    readonly inputDate: Locator;
    readonly nextCalendar: Locator;
    readonly inputPickupTime: Locator;
    readonly inputPackages: Locator;
    readonly buttonSearch: Locator;

    constructor(page: Page){
        this.page = page;
        this.inputPlace = page.locator('xpath=//input[@id="react-select-2-input"]');
        this.inputDate = page.getByPlaceholder('Tanggal mulai');
        this.nextCalendar = page.locator('id=nextMonth');
        this.inputPickupTime = page.locator('id=react-select-3-input');
        this.inputPackages = page.locator('id=react-select-6-input');
        this.buttonSearch = page.locator('xpath=//button[@aria-label="button search"]')
    }
}

export class PLPLocator{
    readonly page: Page;
    readonly allAvailableUnitList: Locator;
    readonly labelWithDriver: Locator;
    readonly labelHourly: Locator;

    constructor(page: Page){
        this.page = page;
        this.allAvailableUnitList = this.page.locator("xpath=//button[@id='order-button']/../../../../p");
        this.labelWithDriver = this.page.locator("xpath=//span[text()='Dengan pengemudi']");
        this.labelHourly = this.page.locator("xpath=//h4[text()='Rental Jam']");
    }
}