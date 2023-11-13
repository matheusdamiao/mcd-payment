import React from "react";
import error from "./../../../public/error.png";

const Page = () => {
  return (
    <div className="flex items-center flex-col justify-center h-screen w-full bg-white">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={error.src} alt="" />
      </div>
      <div className="pt-2">
        <h2 className="text-black text-lg font-bold text-center">
          Ocorreu um errro
        </h2>
        <h4 className="pt-2 text-black text-sm font-medium text-center">
          Infelizmente a transação não foi finalizada devido a algum erro
        </h4>
      </div>
    </div>
  );
};

export default Page;
