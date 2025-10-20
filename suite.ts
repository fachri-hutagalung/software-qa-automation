import { test, Page, Locator } from '@playwright/test';

export class Suite{
    readonly  page: Page;
    readonly  buttonSkipGuidance: Locator;

    constructor(page: Page){
        this.page = page;
        this.buttonSkipGuidance = page.getByRole("button", { name: 'Lewati'})
    }

    async testSetup(){
        await this.page.goto('/');
        // await this.buttonSkipGuidance.waitFor( {state: "visible"});
        if ( await this.buttonSkipGuidance.isVisible() ){
            await this.buttonSkipGuidance.click();
        }
    }
}