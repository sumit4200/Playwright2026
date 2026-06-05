import {test,expect,Page, BrowserContext, Locator} from "@playwright/test";


test("Browser Context - Validating Error Login",async({browser})=>{

    
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();

    const userName:Locator = page.locator("#username");
    const password:Locator = page.locator("[type='password']");
    const signInBtn:Locator = page.locator("input[id='signInBtn']");
    const errorMsg:Locator = page.locator("[style*='block']");
    const iphoneX:Locator = page.locator(".card-title a");
    const allProducts:Locator = page.locator(".card-title a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
    await userName.pressSequentially("rahulshettyacademy9",{delay:1});
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    let errorMessage:string|null = await errorMsg.textContent();
    if(errorMessage)
        console.log(errorMessage);
    else
        console.log("No text displayed"); //we can put assertion here.

   
    
    await expect(errorMsg).toHaveText("Incorrect username/password.");

    await userName.clear();
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();

    await expect(iphoneX.nth(0)).toHaveText("iphone X");
    //grab all products text
    let allproducts_text:Locator[] =  await allProducts.all();
    for(let product of allproducts_text)
    {
        let text = await product.textContent();
        console.log(text);
    }

    await page.waitForTimeout(3333);
});

test("UI Controls",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName:Locator = page.locator("#username");
    const password:Locator = page.locator("[type='password']");
    const signInBtn:Locator = page.locator("input[id='signInBtn']");
    const errorMsg:Locator = page.locator("[style*='block']");
    const dropdown:Locator = page.locator("select.form-control");
    const userCheckBox:Locator = page.locator("[class='checkmark']");
    const popup_ok_btn:Locator = page.locator("#okayBtn");
    const termsChkBox:Locator = page.locator("#terms");
    const firstBlinkingText:Locator = page.locator("//a[contains(text(),'Access')]");


    await dropdown.selectOption("consult");

    await userCheckBox.last().click();
    await popup_ok_btn.click();

    await expect(userCheckBox.last()).toBeChecked();
    
    const value:boolean = await userCheckBox.last().isChecked();
    console.log("-------------------->"+value);

    await page.locator("#terms").click();
    await expect(termsChkBox).toBeChecked();
    await termsChkBox.uncheck();
    //No direct assertion to Be Unchecked.
    const chkbox:boolean = await termsChkBox.isChecked();
    expect(chkbox).toBeFalsy();

    await expect(firstBlinkingText).toHaveAttribute("class","blinkingText");
   
    const attr:string|null = await firstBlinkingText.getAttribute("class");
    if(attr)
        console.log("----------------->"+attr);

    await page.waitForTimeout(2000);

 });

test("Handle child windows",async({browser})=>{

    let context:BrowserContext = await browser.newContext();
    let page:Page  = await context.newPage();
    const userName:Locator = page.locator("#username");
   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const firstBlinkingText:Locator = page.locator("//a[contains(text(),'Access')]");
    
    const [newPage] =  await Promise.all(
        
        [
            
        context.waitForEvent('page'),
        firstBlinkingText.click(), ]);
 
    let newPageUrl:string =  newPage.url();  
    console.log(newPageUrl) ;

    let text:string|null = await newPage.locator("[class='im-para red']").textContent();
    if(text)
    console.log(text);
    let email:string = "";
    let data:string[]|undefined = text?.split("@");
    if(data)
    {
    let rightsideval:string = data[1];
    let rightvalsplit:string[] = data[1].split(" ");
    email = rightvalsplit[0];
    console.log("email is ==============="+email);
    }

    console.log("email is ====>>>>> "+email);

    await userName.fill(email);
    let email_textbox:string|null = await userName.inputValue();
    if(email_textbox)
    console.log("email value entered is = "+email_textbox);

    await newPage.waitForTimeout(4000);
 
});