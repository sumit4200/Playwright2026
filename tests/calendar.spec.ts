import {Browser,BrowserContext, chromium, Page, test,Locator, Frame, FrameLocator}   from    "@playwright/test"

test("handle calendar",async({page})=>{

 

await page.goto("https://jqueryui.com/datepicker/");

 
await page.waitForSelector("//iframe",{state:"visible",timeout:6000});

let iframeEle:FrameLocator =  page.frameLocator("//iframe");
await iframeEle.locator("//input[@id='datepicker']").click();

await iframeEle.locator(".ui-datepicker-calendar").waitFor({state:"visible",timeout:5000});

let data:string|null = await iframeEle.locator("//div[@class='ui-datepicker-title']").textContent() ;
if(data)
    console.log(data);

let data2:string|null = await iframeEle.locator("//div[@class='ui-datepicker-title']").innerText();
if(data2)
    console.log(data2);

console.log(data2==='May 2026');
console.log(data2?.replace(/\u00A0/g, "[NBSP]"));

const title = iframeEle.locator("//div[@class='ui-datepicker-title']");


while(  !( (await title.textContent())?.replace(/\s/g,"")== "June2027" ))
{
    await iframeEle.locator("//a[@title='Next']").click();

}


  let dates:Locator[] =await iframeEle.locator("//a[@class='ui-state-default']").all();

  for(let date of dates)
  {
    let d:string|null = await date.textContent() ;

    if(d==="23")
        await date.click();
    

  }

    let val:string = await iframeEle.locator("#datepicker").first().inputValue();
  console.log(val);
     


});