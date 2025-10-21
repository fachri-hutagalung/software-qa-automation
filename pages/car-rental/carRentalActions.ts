import { Page, expect } from '@playwright/test';
import { getFullDate, markAsFailed } from '../../helper/general';
import { CarRentalLocator, PLPLocator } from '../car-rental/carRentalLocator'

//action untuk halaman Homepage / trac compro
export class Homepage{
    readonly page: Page;
    private readonly locator: CarRentalLocator;

    constructor(page: Page){
        this.page = page;
        this.locator = new CarRentalLocator(page);
    }

    async selectCity(city: string){
        await this.locator.inputPlace.click();
        await this.locator.inputPlace.fill(city);
        await this.locator.inputPlace.press('Enter');
    }

    async selectDateOffset(offset: number){
        await this.locator.inputDate.waitFor({state:"visible"});
        await this.locator.inputDate.click();

        var date = getFullDate(offset, 'en');
        
        var xpathCalendar = "xpath=//div[@role='option'][@aria-disabled='false'][text()='"+date[0]+"'][contains(@aria-label,'"+date[1]+"')][contains(@aria-label,'"+date[2]+"')]";
        const pickDate = (await this.page.locator(xpathCalendar));

        var iter = 0;
        while ( await pickDate.isVisible() == false ){
            await this.locator.nextCalendar.click();

            if(iter > 3){
                var message = "Failed to find date "+date[0]+" "+date[1]+" "+date[2]+" for 3 month range";
                markAsFailed(message);
            }

            iter++;
        }
        await pickDate.waitFor({state:"visible"});
        await pickDate.click();
    }

    async selectPickupTime(hours: string = '0', minutes: '00' | '30'){
        const time = hours+":"+minutes; 
        await this.locator.inputPickupTime.click();
        await this.locator.inputPickupTime.fill(time);
        await this.locator.inputPickupTime.press('Enter');
    }

    async selectPackages(packages: '4' | '12'){
        var formattedPackage = packages +' Hours/Day';
        await this.locator.inputPackages.click();
        await this.locator.inputPackages.fill(formattedPackage);
        await this.locator.inputPackages.press('Enter');
    }

    async clickSearch(){
        await this.locator.buttonSearch.click()

    }
}

//action untuk halaman PLP
export class PLP{
    readonly page: Page;
    private readonly locator: PLPLocator; 

    constructor(page: Page){
        this.page = page;
        this.locator = new PLPLocator(page);
    }

    async selectVehicle(vehicleName: string){
        vehicleName = vehicleName.toUpperCase();
        const buttonPesan = this.page.locator("xpath=//p[contains(text(),'"+vehicleName+"')]/..//button");

        try{
            await buttonPesan.waitFor({state : "visible", timeout: 10000});
            await buttonPesan.click();
        }catch{
            var n = await this.locator.allAvailableUnitList.count();
            var listUnit = [];
            console.log("\nList available unit : ")

            for (var i = 0; i < n ; i++){
                listUnit[i] = await this.locator.allAvailableUnitList.nth(i).textContent();
                var no = i+1;
                console.log(no+". "+listUnit[i]);
            }

            markAsFailed("The car named '"+vehicleName+"' that you wanted, is not exist / not ready to order");
        }
    }
}
