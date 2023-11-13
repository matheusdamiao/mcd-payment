import { generateAccessToken } from "./authTokenGenerator";
import { handleResponse } from "./handleResponse";

export const createOrder = async (cart: string) => {
    // const baseForLocal = "https://api-m.sandbox.paypal.com";
    const base = 'https://api-m.paypal.com'

    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log(
      "shopping cart information passed from the frontend createOrder() callback:",
      cart,
    );
  
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "BRL",
            value: "1.00",
          },
        },
      ],
    };

    const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
          // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      return handleResponse(response);

    }