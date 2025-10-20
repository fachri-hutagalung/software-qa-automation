import { Locator, Page } from '@playwright/test';
import { getFullDate } from '../helper/general';
import { error } from 'console';

export class Homepage{
    readonly page: Page;
    readonly inputPlace: Locator;
    readonly inputDate: Locator;
    readonly nextCalendar: Locator;

    constructor(page: Page){
        this.page = page;
        this.inputPlace = page.locator('xpath=//input[@id="react-select-2-input"]');
        this.inputDate = page.getByPlaceholder('Tanggal mulai');
        this.nextCalendar = page.locator('id=nextMonth');
    }

    async selectCity(city: string){
        await this.inputPlace.click();
        await this.inputPlace.fill(city);
        await this.inputPlace.press('Enter');
    }

    async selectDate(offset: number){
        await this.inputDate.waitFor({state:"visible"});
        await this.inputDate.click();

        var date = getFullDate(offset,'en');
        
        var xpathCalendar = "xpath=//div[@role='option'][@aria-disabled='false'][text()='"+date[0]+"'][contains(@aria-label,'"+date[1]+"')][contains(@aria-label,'"+date[2]+"')]";
        const pickDate = (await this.page.locator(xpathCalendar));

        var iter = 0;
        while ( await pickDate.isVisible() == false ){
            await this.nextCalendar.click();

            if(iter > 3){
                throw new Error('Failed to find date '+date[0]+" "+date[1]+" "+date[2]+" for 3 month range")
            }

            iter++;
        }
        await pickDate.waitFor({state:"visible"});
        await pickDate.click();
    }
}
