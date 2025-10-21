import { test as carRentTest } from '@playwright/test'
import { Homepage , PLP } from '../pages/car-rental/carRentalActions'
import { CarRentalAssertion } from '../pages/car-rental/carRentalAssertions'

type carRentalFixture = {
    homepage: Homepage
    plp: PLP
    assertion: CarRentalAssertion
}

export const test = carRentTest.extend<carRentalFixture>({
    homepage: async ({ page }, use) => {
        const homepage = new Homepage(page);
        await use(homepage);
    },
    plp: async ({ page }, use) => {
        const plp = new PLP(page);
        await use(plp);
    },
    assertion: async ({ page }, use) => {
        const assert = new CarRentalAssertion(page);
        await use(assert);
    }
})