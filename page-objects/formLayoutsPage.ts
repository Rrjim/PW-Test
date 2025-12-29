import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page) {
        super(page)
    }

    /**
     * This method fills out the Inline form with user details
     * @param email  - should be first and last name
     * @param password - valid email for the test user
     * @param optionText - true or false if user session to be saved
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name:"Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name:"Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * 
     * @param name 
     * @param email 
     * @param rememberMe 
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name:"Jane Doe"}).fill(email)
        await inlineForm.getByRole('textbox', {name:"Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }
}