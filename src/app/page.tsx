"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import logo from "./../../public/MCD_logo_original_fundo_branco.png";
import { OnApproveActions } from "@paypal/paypal-js";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  const paypalCaptureOrder = async (
    orderId: string,
    actions: OnApproveActions
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   orderID: orderId,
        // }),
      });

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        console.log(`${errorDetail.description} (${orderData.debug_id})`);
        route.push("/error");
      } else if (!orderData.purchase_units) {
        console.log(JSON.stringify(orderData));
        route.push("/error");
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        // alert(
        //   `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
        // );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        route.push("/thanks");
      }
    } catch (error) {
      console.error(error);
      alert(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  const paypalCreateOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   user_id: process.env.PAYPAL_CLIENT_ID,
        //   order_price: "110",
        // }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        console.log(errorMessage);
        route.push("/error");
      }
    } catch (error) {
      console.error(error);
      // alert(`Could not initiate PayPal Checkout...<br><br>${error}`);
      route.push("/error");
    }
  };

  return (
    <main className="w-full bg-white flex flex-col h-screen px-2">
      <div className="flex flex-col justify-center items-center  max-w-sm w-full m-auto max-h-[500px] h-full rounded-3xl border-2 ">
        <div className="max-w-sm w-full h-full pt-5 flex flex-col justify-evenly">
          <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" />
          </div>
          <div className="flex flex-col items-center gap-7 ">
            <div>
              <h2 className="text-[#505050] text-center font-bold text-xs">
                Detalhes do pagamento
              </h2>
              <h4 className="text-[#6D6D6D] text-center text-xs font-normal max-w-[80%] m-auto pt-3">
                Aqui podemos colocar alguma descrição dos serviços
              </h4>
            </div>
            <div className="flex justify-between w-full px-2 items-baseline max-w-[320px]">
              <small className="text-[#5F5F5F] text-sm">Total</small>
              <p className="text-3xl text-[#1D81A2] ">R$ 800</p>
            </div>
          </div>
        </div>
        <PayPalButtons
          className="w-80 px-1"
          style={{
            height: 55,
            disableMaxWidth: false,
            color: "gold",
          }}
          createOrder={async (data, actions): Promise<string> => {
            const order = await paypalCreateOrder();
            return order + "";
          }}
          onApprove={async (data, actions): Promise<void> => {
            console.log("olha o order id aí:", data.orderID);
            let response = await paypalCaptureOrder(data.orderID, actions);
            return response;
            // if (response) return;
          }}
        />
        {}
      </div>
    </main>
  );
}
