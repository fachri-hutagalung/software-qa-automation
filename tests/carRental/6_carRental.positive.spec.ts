
import { test } from '../../fixtures/carRentalFixture'
import { Suite } from '../../suite';



test.describe('Test Case Collection for Car Rental Transaction', async () => {
    
    test.beforeEach( async ({ page }) =>{
        const suite = new Suite(page)
        await suite.testSetup()
    });

    test('customer want to checkout car rental hourly 4 hours package with driver', async ({ homepage, plp, assertion }) => {
        await test.step('Customer input rental detail', async () => {
            
            await homepage.selectCity('Jakarta');
            await homepage.selectDateOffset(2);
            await homepage.selectPickupTime('07','30');
            await homepage.selectPackages('4');
            await homepage.clickSearch();
            await assertion.validatePLPPage('id');
        })

        await test.step('customer select unit', async () => {
            await plp.selectVehicle('ZENIX')
        })
    });
})


