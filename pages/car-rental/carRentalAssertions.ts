import { Locator, Page, expect } from '@playwright/test';
import { PLPLocator } from '../car-rental/carRentalLocator'

export class CarRentalAssertion{
    readonly page: Page;
    private readonly locator: PLPLocator;

    constructor(page: Page){
        this.page = page;
        this.locator = new PLPLocator(page);
    }
    
    async validatePLPPage(lang: 'id' | 'en'){
        switch (lang) {
            case 'id' :
                await expect(this.locator.labelWithDriver).toBeVisible();
                await expect(this.locator.labelHourly).toBeVisible();
                break;
            case 'en' :
                await expect(this.page.getByText('With driver')).toBeVisible();
                await expect(this.page.getByText('Hourly Rental')).toBeVisible();
                break;
        }   
    }
}