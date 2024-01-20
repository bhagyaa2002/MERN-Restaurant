import React, { useEffect, useState } from "react";

import OrderHistoryCard from "../component/OrderHistoryCard";
import OrderHistoryCardCopy from "../component/OrderHistoryCardCopy";
import { useSelector } from "react-redux";

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
  


  return (
    <div>
      <p className="flex justify-start text-3xl mt-5 ml-10 font-mono font-black ">My Orders</p>
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
  );
};

export default Order;