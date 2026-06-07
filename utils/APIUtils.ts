import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class APIUtils {
    loginPayload: any;
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext, loginPayload: any) {
        this.loginPayload = loginPayload;
        this.apiContext = apiContext;
    }

    async getToken(): Promise<string> {
        const loginResponse: APIResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        const loginResponseJson = await loginResponse.json();
        const token: string = loginResponseJson.token;

        return token;
    }

    async createOrder(orderPayLoad: any): Promise<{ token: string; orderId: string }> {

        const response: {
            token: string;
            orderId: string;
        } = {
            token: "",
            orderId: ""
        };

        const token = await this.getToken();
        response.token = token;

        const orderResponse: APIResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            }
        );

        expect(orderResponse.ok()).toBeTruthy();

        const orderResponseJson = await orderResponse.json();

        const orderId: string = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
    
}

 