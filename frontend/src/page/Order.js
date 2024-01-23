import React, { useEffect, useState } from "react";

import OrderHistoryCard from "../component/OrderHistoryCard";
import OrderHistoryCardCopy from "../component/OrderHistoryCardCopy";
import { useSelector } from "react-redux";

import Lottie from "react-lottie";
import noOrder from "../assest/no-orders.json";
const Order = () => {
  const user = useSelector((state) => state.user);
  const [orderHistoryList, setorderHistoryList] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      console.log("called");
      console.log(user._id);
      try {
        const handleOrder = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/fetchAllOrder/${user._id}`);

        const orderDetails = await handleOrder.json();
        setorderHistoryList(orderDetails)
        console.log(orderHistoryList);
  
  
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    fetchData(); 
  }, []);
  useEffect(() => {
    // This useEffect will log the updated state whenever orderHistoryList changes
    console.log(orderHistoryList);
  }, [orderHistoryList]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noOrder, // the path to your animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [shouldRenderLottie, setShouldRenderLottie] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRenderLottie(true);
    }, 500); // 5000 milliseconds = 5 seconds

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);


  return (
    orderHistoryList.length===0? ( <div className="relative flex flex-col justify-center items-center">
        {shouldRenderLottie && (
          <>
    <div className="flex justify-center items-center mt-12">
  
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
    <p className="absolute text-xl font-semibold mt-60">No Orders Placed Yet</p>
    </>
    )}
    
   
  </div> ):(


    <div>
      {/* <p className="flex justify-start text-3xl mt-5 ml-16   ">My Orders</p> */}
      <h3 className="text-lg md:text-2xl font-bold text-slate-600 p-4">
        My Orders
      </h3>
      <div className="flex flex-col justify-center items-center pt-3">
        {
          orderHistoryList.map((el)=>(
            
            <OrderHistoryCardCopy 
            key={el._id}
            itemImage= {el.itemImage}
            itemName= {el.itemName}
            itemCategory={el.itemCategory}
            itemQty={el.itemQty}
            itemPrice= {el.itemPrice}
            itemTotal={el.itemTotal}
            orderTimestamp= {el.orderTimestamp}
            activeStatus={el.activeStatus}
            
            />
          ))
          
        }
        
        
        {/* <OrderHistoryCardCopy />
        <OrderHistoryCard />
        <OrderHistoryCardCopy />
        <OrderHistoryCard />
        <OrderHistoryCardCopy />
        <OrderHistoryCard />
        <OrderHistoryCardCopy />
        <OrderHistoryCard />
        <OrderHistoryCard />
        <OrderHistoryCard /> */}
      </div>
    </div>
  )
  );
};

export default Order;