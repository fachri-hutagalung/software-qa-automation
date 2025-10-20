import { Locator, Page } from '@playwright/test';
import { getFullDate, markAsFailed } from '../helper/general';

export class Homepage{
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
        this.inputPickupTime = page.locator('id="react-select-3-input"');
        this.inputPackages = page.locator('id="react-select-6-input"');
        this.buttonSearch = page.getByRole('button', {name : "Cari"});
    }

    async selectCity(city: string){
        await this.inputPlace.click();
        await this.inputPlace.fill(city);
        await this.inputPlace.press('Enter');
    }

    async selectDateOffset(offset: number){
        await this.inputDate.waitFor({state:"visible"});
        await this.inputDate.click();

        var date = getFullDate(offset, 'en');
        
        var xpathCalendar = "xpath=//div[@role='option'][@aria-disabled='false'][text()='"+date[0]+"'][contains(@aria-label,'"+date[1]+"')][contains(@aria-label,'"+date[2]+"')]";
        const pickDate = (await this.page.locator(xpathCalendar));

        var iter = 0;
        while ( await pickDate.isVisible() == false ){
            await this.nextCalendar.click();

            if(iter > 3){
                var message = "Failed to find date "+date[0]+" "+date[1]+" "+date[2]+" for 3 month range";
                markAsFailed(message);
            }

            iter++;
        }
        await pickDate.waitFor({state:"visible"});
        await pickDate.click();
    }

    async selectPickupTime(hours: string = '07', minutes: string = '00'){
        const time = hours+":"+minutes; 
        await this.inputPickupTime.click();
        await this.inputPickupTime.fill(time);
        await this.inputPickupTime.press('Enter');
    }

    async selectPackages(packages: '4' | '12'){
        var formattedPackage = packages +' Hours/Day';
        await this.inputPackages.click();
        await this.inputPackages.fill(formattedPackage);
        await this.inputPackages.press('Enter');
    }

    async clickSearch(){
        await this.buttonSearch.click()
        
    }
}
