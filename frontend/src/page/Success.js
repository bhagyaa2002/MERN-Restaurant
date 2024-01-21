import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import success from "../assest/success2.json";

const Success = () => {
  const { id } = useParams();
  const data = {
    id: id,
    activeStatus: "success",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const handleOrder = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/orderDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const orderDetails = await handleOrder.json();
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchData();
  }, [id]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success, // the path to your animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log(id);
  return (
   

    <div className="relative flex flex-col justify-center items-center">
      
      <div className="flex justify-center items-center mt-12">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <p className="absolute text-xl font-semibold mt-44">Payment Success</p>
    </div>
  );
};

export default Success;
