import {test,expect,Locator}   from    "@playwright/test"

test.only("handle calendar",async({page})=>{



let monthNumber:string ="1";
let date:string = "1";
const year:string = "2032"




let dates:Locator =  page.locator("//div[contains(@class,'view__days') ]/button [ not ( contains(@class,'-neighboringMonth'))]");
let dateTextbox = page.locator("input[name='date']");

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
 
await page.locator(".react-date-picker__inputGroup").click();
await expect(page.locator(".react-calendar")).toBeVisible();
await page.locator(".react-calendar__navigation__label").click();

while( !( await page.locator(".react-calendar__navigation__label").textContent()===year))
{
   await page.locator("[class*='next-']").click();
}

await page.locator("abbr").nth(Number(monthNumber)-1).click();
 //wait for single date to be visible

 await expect(dates.first()).toBeVisible();
 await dates.first().waitFor({state:'visible',timeout:4000});



 //select dates
 let allDates:Locator[] = await dates.all();
 for( let single_date of allDates)
 {
    let dateVal:string|null = await single_date.textContent();
    if(dateVal===date)
    {
        await single_date.click();
        break;
    }
    
}

 if(Number(monthNumber) < 10)
{
    monthNumber = "0" + monthNumber;
}

if(Number(date)<10)
{
    date = "0" + date ; 
}
let finalStr:String = year + "-" + monthNumber + "-" + date;



let dateVal:string  = await dateTextbox.inputValue();
console.log(dateVal);

 expect(dateVal).toEqual(finalStr);

await page.waitForTimeout(3000);

});