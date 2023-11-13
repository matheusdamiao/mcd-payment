import { generateAccessToken } from "./authTokenGenerator";
import { handleResponse } from "./handleResponse";

export const captureOrder = async (orderID: string) => {
    const accessToken = await generateAccessToken();
    // const baseForLocal = "https://api-m.sandbox.paypal.com";
    const base = 'https://api-m.paypal.com';
    console.log('orderId da capture funcction', orderID);

    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });
  
    // const data = await response.json()
    // console.log(data);

    return handleResponse(response);
    // return data
  };