import {expect, FrameLocator, test} from "@playwright/test";


test("Popup Validations",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com");
    await page.goBack();
   

    await expect(page.locator("[placeholder='Hide/Show Example']")).toBeVisible();
    await page.locator("[value='Hide']").click();
    await expect(page.locator("[placeholder='Hide/Show Example']")).toBeHidden();
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

    let frameLoc:FrameLocator =  page.frameLocator("");
    frameLoc.locator("").click();


});