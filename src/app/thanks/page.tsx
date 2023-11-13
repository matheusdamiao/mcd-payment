import React from "react";
import success from "./../../../public/success.png";

const Page = () => {
  return (
    <div className="flex items-center flex-col justify-center h-screen w-full bg-white">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={success.src} alt="" />
      </div>
      <div className="pt-2">
        <h2 className="text-black text-lg font-bold text-center">
          Pagamento realizado!
        </h2>
        <h4 className="pt-2 text-black text-sm font-medium text-center">
          A transação foi concluída com sucesso!
        </h4>
      </div>
    </div>
  );
};

export default Page;
