import React from "react";
import logo from "../assest/noodles.png";
import checkMark from "../assest/check-mark.png";
import crossMark from "../assest/cross-mark.png";
import logo1 from "../assest/dosa-masala.png";

const OrderHistoryCard = () => {
  return (
    <div className="bg-red-300/60 p-5 mt-2.5 mb-2.5 rounded-xl flex w-1/2 justify-between">
      <div className=" flex items-center  ">
        <img src={logo} className="h-20 w-24 object-fit rounded-xl" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex items-center text-xl font-mono ">
          Amaranthus
        </div>
        <div className=" flex items-center font-mono font-thin text-slate-500">
          Vegetable
        </div>
      </div>

      <div className="flex flex-col justify-center font-mono ml-20 text-lg">
        <div className="flex  ">
          <div className="flex pb-3 gap-12 items-center">
            <div className="flex">
              <p className="flex text-slate-500">
                Qty:
              </p>
              <p className="">2</p>
            </div>

            <div className="flex ">
              <p className="flex text-slate-500">
                Price:
              </p>
              <p className="">50</p>
            </div>

            <div className="flex items-center ">
              <p className=" text-slate-500 ">Total:</p>
              <p className=" text-xl ">100</p>
            </div>
          </div>
        </div>

        <div className=" flex justify-end">
          <p className="flex text-slate-500">
            Order Date:
          </p>
          <p className="">10/1/2024</p>
        </div>
      </div>
      <div className="flex items-center place-self-end pb-2">
        <img src={crossMark} className="w-6" />
      </div>
    </div>
  );
};

export default OrderHistoryCard;







