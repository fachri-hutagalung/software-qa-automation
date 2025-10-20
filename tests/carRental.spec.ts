import { test } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { Suite } from '../suite';

test.describe('Test Case Collection for Car Rental Transaction', async () => {
    let feature: Homepage;

    test.beforeEach( async ({ page }) =>{
        feature = new Homepage(page);
        const suite = new Suite(page);

        await suite.testSetup();
    });

    test('customer want to search car rental hourly 4 hours package with driver', async ({ page }) => {
        await test.step('Customer input rental detail', async () => {
            await feature.selectCity('Jakarta');

            await feature.selectDate(7);
        })
    });
})


