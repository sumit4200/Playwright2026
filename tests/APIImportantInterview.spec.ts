import {test,expect} from "@playwright/test";

test("Get Request",async({request})=>{

  const baseUrl = "https://dummy.restapiexample.com";

  const response = await request.post(`${baseUrl}/create`,{

    headers:{"Content-Type":"application/json"},
    data:{
      "name":"sumit",
      "salary":"98970",
      "age":"39"
    }

  })
 console.log(await response.json());
 console.log( response.status());



});
 