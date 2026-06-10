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

test("Screenshot and Visual Comparision",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    // await page.screenshot({path:'./tests/screenshot.png'});
    await page.locator("#openwindow").screenshot({path:'./utils/partialscreenshot.png'});
    
});

test.only("Visual",async({page})=>{

    await page.goto("https://flightware.com");
    expect(await page.screenshot()).toMatchSnapshot('Landing.png');
    
});
