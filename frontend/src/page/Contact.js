import React, { Component, useState } from "react";
import c1 from "../assest/c1.png";
//import c2 from "../assest/c2.png";
import c2 from "../assest/unsplash.png";
import fast from "../assest/fast-delivery.png";
import { Carousel } from "react-responsive-carousel";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import support from "../assest/24-hours-support.png";
import delivery from "../assest/fast-delivery.png";
import best from "../assest/best-seller.png";
import insta from "../assest/instagram.png";
import whatsapp from "../assest/whatsapp.png";
import twitter from "../assest/twitter.png";
import mail from "../assest/mail.png";
import address from "../assest/location.png";
import call from "../assest/call.png";
import { Link, useLocation } from "react-router-dom";
import icons from "../assest/icons8-express-delivery-100.png";
const Contact = () => {
  let [current, setCurrent] = useState(0);
  let slides = [c1, c2];

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  const location = useLocation();
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden absolute w-full bg-cover  ">
        <div
          className="flex transition ease-out duration-40 "
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {slides.map((s) => {
            return <img src={s} className="flex h-96 bg-cover" />;
          })}
        </div>

        <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
          <button onClick={previousSlide}>
            <BsFillArrowLeftCircleFill />
          </button>
          <button onClick={nextSlide}>
            <BsFillArrowRightCircleFill />
          </button>
        </div>

        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrent(i);
                }}
                key={"circle" + i}
                className={`rounded-full w-5 h-5 cursor-pointer  ${
                  i == current ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="flex mt-6"></div>
      <div className="flex justify-center items-center mt-96 ">
        <p className="text-4xl ">Our Services</p>
      </div>
      <div className="flex mt-6 justify-items-center justify-around  bg-yellow-100 pt-3 pb-3 ">  
        <div className="flex flex-col  bg-indigo-200 w-1/5 h-1/5 items-center justify-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <p className="text-xl font-semibold mt-3">Fast Delivery</p>
          <img src={icons} className="mt-6 h-36" />
          <p className="mt-6 text-center mb-3">
            Swift Solutions, Seamless Delivery - Bringing Your Orders at the
            Speed of Now!{" "}
          </p>
        </div>
        <div className="flex flex-col bg-pink-400 w-1/5 h-1/5 items-center justify-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <p className="text-xl font-semibold mt-3">24*7 Service</p>
          <img src={support} className="mt-6 h-36" />
          <p className="mt-6 text-center mb-3">
            Uninterrupted Shopping , Anytime , Anywhere - Your 24/7 Retail
            Companion{" "}
          </p>
        </div>
        <div className="flex flex-col bg-green-300 w-1/5 h-1/5 items-center justify-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <p className="text-xl font-semibold mt-3">Quality Product</p>
          <img src={best} className="mt-6 h-36" />
          <p className="mt-6 text-center mb-3">
            {/* Good product at affordabee price Good product at affordabee price{" "} */}
            Excellence Delivered Elevate Your Experience with Our Premium
            prioducts and Impeccable Service.{" "}
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center  ">
        {/* <p className="text-4xl ">Contact Us</p> */}
      </div>
      
    </div>
  );
};

export default Contact;
