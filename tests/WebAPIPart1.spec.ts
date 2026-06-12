import {test,expect,request, Locator,APIRequestContext, APIResponse} from "@playwright/test";

import { APIUtils } from '../utils/APIUtils';

const loginPayLoad = {userEmail: "goyalsumit319@gmail.com", userPassword: "Subh@1987#!"};
const orderPayLoad =  {orders: [{country: "Afghanistan", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}

let response: {
    token: string;
    orderId: string;
};

test.beforeAll(async ()=>{

    //Login API 
    let apiContext:APIRequestContext = await request.newContext();
    
    const apiutils = new APIUtils(apiContext,loginPayLoad);
    response= await apiutils.createOrder(orderPayLoad);
    

});

test("@regression Place the order",async({page})=>{


    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value);

    },response.token);

 await page.goto("https://rahulshettyacademy.com/client");
 
const ordersTab:Locator = page.locator("button:has-text('Orders')");
const orderIdAllList:Locator = page.locator("tbody tr th");
const orderIDHeader:Locator = page.locator("th:has-text('Order Id')");
const viewButton:Locator = page.locator("button:has-text('View')")

 
 

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
   if(order_text_id===response.orderId)
   {
        await allVieWBtn[i].click();
        break;
   } 
}
 if(response.orderId)
 await expect(page.locator("[class='col-title']+div")).toHaveText(response.orderId);
 
});

 