import React, { useEffect } from "react";
import logo from "../assest/noodles.png";
import checkMark from "../assest/check-mark.png";
import crossMark from "../assest/cross-mark.png";
import logo1 from "../assest/dosa-masala.png";

const OrderHistoryCardCopy = ({
  key,
  itemImage,
  itemName,
  itemCategory,
  itemQty,
  itemPrice,
  itemTotal,
  orderTimestamp,
  activeStatus,
}) => {
    
      console.log(orderTimestamp);
      const date=new Date(orderTimestamp*1)
//       const formattedDateTime =
//   date.getDate() +
//   '/' +
//   (date.getMonth() + 1) +
//   '/' +
//   date.getFullYear() +
//   ' ' +
//   date.getHours() +
//   ':' +
//   date.getMinutes() +
//   ':' +
//   date.getSeconds();

  



      const formattedDateTime = date.toLocaleString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });
        console.log(formattedDateTime);
    
   
  return (
    <div className={`${activeStatus==="success"? "bg-green-200/75" : "bg-red-200"} p-5 mt-2.5 mb-2.5 rounded-xl flex w-1/2 justify-between`} >
      <div className=" flex items-center w-full ">
        <img src={itemImage} className="h-20 w-24 object-fit rounded-xl" />
      </div>
      <div className="flex flex-col items-center justify-center w-full -ml-48">
        <div className=" flex items-center justify-center text-xl  font-mono text-center">{itemName}</div>
        <div className=" flex items-center font-mono font-thin text-slate-500">
          {itemCategory}
        </div>
      </div>

      <div className="flex flex-col justify-center font-mono  text-lg ">
        
          <div className="flex pb-3 gap-9 items-right">
            <div className="flex ">
              <div className="flex text-slate-500 ">Qty:</div>
              <div className="">{itemQty}</div>
            </div>

            <div className="flex ">
              <div className="flex text-slate-500">Price:</div>
              <div className="">{itemPrice}</div>
            </div>

            <div className="flex  ">
              <div className=" text-slate-500 ">Total:</div>
              <div className="text-xl  ">{itemTotal}</div>
            </div>
         
        </div>

        <div className=" flex justify-end text-sm">
          <p className="flex text-slate-500">Order Date:</p>
          <p className="">{formattedDateTime}</p>
        </div>
      </div>
      <div className="flex items-center place-self-end ml-2 pb-2">
        <img src={activeStatus==="success"?checkMark:crossMark} className="w-12" />
      </div>
    </div>
  );
};

export default OrderHistoryCardCopy;
