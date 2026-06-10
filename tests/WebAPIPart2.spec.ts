import {Locator, test,expect, BrowserContext, Page} from "@playwright/test";

let webContext:BrowserContext;

test.beforeAll(async({browser})=>{
  
const browserContext:BrowserContext = await browser.newContext();
const page:Page  = await browserContext.newPage();    
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

const userName:Locator = page.locator("#userEmail");
const userPass:Locator = page.locator("#userPassword");
const userSignIn:Locator = page.locator("[value='Login']");

await userName.fill("goyalsumit319@gmail.com");
await userPass.fill("Subh@1987#!");
await userSignIn.click();

// await page.waitForLoadState('networkidle'); //flaky
await page.locator(".card-body b").first().waitFor({state:'visible'});
await browserContext.storageState({path:'state.json'});
//await browser.newContext({storageState:{'./state.json'});

webContext =   await browser.newContext({storageState:'./state.json'});


});

test("Client App Login storage session",async()=>{

let page:Page =  await webContext.newPage();   
await page.goto("https://rahulshettyacademy.com/client");

const productName = "ZARA COAT 3";
const allproducts:Locator = page.locator("[class='card-body']");
const products = page.locator(".card-body");
const userName:Locator = page.locator("#userEmail");
const userPass:Locator = page.locator("#userPassword");
const userSignIn:Locator = page.locator("[value='Login']");
const countryDropdown:Locator = page.locator(".ta-results button span");
const grey_email:Locator = page.locator("[style*='gray']"); 
const place_order:Locator = page.locator("[class*='action__submit']");
const creditCard:Locator = page.locator("[class='input txt text-validated']")
const cvvCode:Locator = page.locator("[class='input txt']");
const cardName:Locator = page.locator("[class='input txt']");
const expiryMonth:Locator = page.locator("[class='input ddl']");
const expiryYear:Locator = page.locator("[class='input ddl']");
const orderSuccessMessage:Locator = page.locator("h1");
const orderId:Locator = page.locator("[class='em-spacer-1'] [class='ng-star-inserted']");
const ordersTab:Locator = page.locator("button:has-text('Orders')");
const orderIdAllList:Locator = page.locator("tbody tr th");
const orderIDHeader:Locator = page.locator("th:has-text('Order Id')");
const viewButton:Locator = page.locator("button:has-text('View')")



// await page.waitForLoadState('networkidle'); //flaky
await page.locator(".card-body b").first().waitFor({state:'visible'});

let allitems:Locator[] = await allproducts.all();

for(let data of allitems)
{
    let actual_text = await data.locator("b").textContent();
    if(actual_text === productName)
    {
        await data.locator(".fa.fa-shopping-cart").click();
       
        break;
    }
}

await page.locator("[routerlink*='cart']").click();
await page.locator("h3:has-Text('ZARA COAT 3')").waitFor({state:'visible',timeout:4000});
let visibleCoat:boolean = await page.locator("h3:has-Text('ZARA COAT 3')").isVisible();
console.log(visibleCoat+"----------------");
expect(visibleCoat).toBeTruthy();

await page.locator("text=Checkout").click();
await page.locator("[placeholder='Select Country']").pressSequentially("in",{delay:200});

//await page.locator('section button > span').getByText('India', { exact: true }).click();
await countryDropdown.first().waitFor({state:'visible',timeout:3000});
let country:Locator[]= await countryDropdown.all();

console.log("count is ="+country.length)

for(let data of country)
{
    let country_txt:string|null = await data.textContent();
    if(country_txt)
    {
        country_txt=country_txt.trim();
       
        if(country_txt==="India")
    {

        await data.click();
        break;
    }
    }
   
}

await expect(grey_email).toHaveText("goyalsumit319@gmail.com");
await creditCard.first().fill("4542 1111 9111 2111");
await cvvCode.first().fill("987");
await cardName.last().fill("Sumit Goyal");
await expiryMonth.first().selectOption("09");
await expiryYear.last().selectOption("30");

await place_order.click();
await expect(orderSuccessMessage).toHaveText(" Thankyou for the order. ");

let orderIdProd:string|null = await orderId.textContent();
if(orderIdProd){

     
     orderIdProd = orderIdProd.split(" ")[2];
}
    console.log(orderIdProd);

await ordersTab.click();

await expect(orderIDHeader).toBeVisible();
await orderIDHeader.waitFor({state:'visible',timeout:4000}); 

let ordersIDList:Locator[] = await orderIdAllList.all();
// for(let order of ordersIDList)
// {
//    let order_text_id:string|null =  await order.locator("th[scope='row']").textContent();
//    if(order_text_id===orderIdProd)
//    {
//         await order.locator("button:has-text('View')").click();
//         break;
//    }
//  }

let allVieWBtn:Locator[] = await viewButton.all();
for(let i=0;i<ordersIDList.length;++i)
{
   let order_text_id:string|null =  await ordersIDList[i].textContent();
   if(order_text_id===orderIdProd)
   {
        await allVieWBtn[i].click();
        break;
   } 
}
 if(orderIdProd)
 await expect(page.locator("[class='col-title']+div")).toHaveText(orderIdProd);
 
});

 