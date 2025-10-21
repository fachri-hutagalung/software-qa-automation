import { test, Page, Locator } from '@playwright/test';

export class Suite{
    readonly  page: Page;
    readonly  buttonSkipGuidance: Locator;
    readonly  compro: Locator;

    constructor(page: Page){
        this.page = page;
        this.buttonSkipGuidance = page.getByRole("button", { name: 'Lewati'})
        this.compro = page.locator('id=logo-link')
    }

    async testSetup(){
        await this.page.goto('https://tractogo.trac.astra.co.id/car-rental');
        await this.compro.waitFor({state : "visible"});
        await this.compro.click();
        await this.buttonSkipGuidance.waitFor( {state: "visible"});
        await this.buttonSkipGuidance.click();
    }
}