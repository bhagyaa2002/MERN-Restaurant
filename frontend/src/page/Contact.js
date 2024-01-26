import React from 'react'
import c1 from "../assest/image.jpg"
import lays from "../assest/about2.jpg";
import truck from "../assest/truck.png";
import payment from "../assest/payment.png";
import quality from "../assest/quality.png";
import support from "../assest/support.png";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className="flex flex-col">
      <div
        className="relative flex h-60 justify-center items-center text-4xl  font-bold  bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url(${c1})`,
          backgroundSize: "cover"
        }}
      ></div>
      <div className="absolute top-1/4 left-1/3 ml-36 text-center">
        <p className="  pt-2 pb-3 pl-2 pr-2 rounded-full text-5xl font-bold">About Us</p>
      </div>
      {/* <div className="flex justify-center text-4xl mt-3 font-bold ">
        About Us
      </div> */}
      <div className="flex justify-center">
        <div className="flex  justify-end m-3 p-6 w-full ">
          <img src={lays} className="rounded-xl h-96 mt-6 " />
        </div>
        <div className="flex justify-start w-full  mt-3 ">
          <div className="flex flex-col pr-60 justify-start">
            <p className="flex mt-5 text-2xl font-bold   justify-start">
              What Makes Us Special?{" "}
            </p>
            <p className="flex mt-2 text-justify">
            Welcome to Foodizo – where each flavor narrates a story, and every bite is a journey into culinary bliss! Our commitment lies in delivering the finest, freshest ingredients directly to your doorstep, turning every meal into a celebration of flavors, textures, and cultures. Picture a world filled with the vibrant colors of fresh vegetables, the juiciness of ripe fruits, the allure of decadent cakes, and the creaminess of artisanal ice creams – a delightful symphony for your taste buds. Navigating our online space is designed for simplicity and ease, ensuring a delicious and effortlessly enjoyable culinary journey. Whether you crave wholesome veggies or indulgent desserts, Foodizo has you covered with a carefully curated selection catering to every palate. Embrace hassle-free dining, where your favorite treats are just a click away, ready to be delivered to your doorstep, allowing you to savor the joy of flavorful dining without the fuss. Welcome to Foodizo – your one-stop destination for culinary delights!

            </p>
            <div className="flex justify-start mt-6">
              <Link to={`/`}>
                <button className="bg-yellow-300 rounded-full p-2 font-semibold hover:scale-105 hover:shadow-xl">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-9">
        <p className="flex justify-center text-4xl mt-3 font-bold ">
          Our Services
        </p>
      </div>
      <div className="flex justify-evenly mb-6">
        <div className="flex flex-col bg-slate-200 w-52 rounded-lg justify-center items-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <img
            src={truck}
            className=" w-20  bg-gray-950 rounded-full mt-3 p-2 "
          />
          <p className="flex font-normal text-2xl mt-6">Free Shipping</p>
          <p className="flex font-light mb-6 text-center p-1">
          Seamless Shipping, Boundless Joy: Where Every Delivery Comes with the Gift of Free Shipping.
          </p>
        </div>
        <div className="flex flex-col bg-slate-200 w-52 rounded-lg justify-center items-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <img
            src={payment}
            className=" w-20  bg-gray-950 rounded-full mt-3 p-3 "
          />
          <p className="flex font-normal text-2xl mt-6">Secure Payment</p>
          <p className="flex font-light mb-6 text-center p-1">
            100% Safe & Simple Payments Your Peace of Mind, Our Guarantee.
          </p>
        </div>
        <div className="flex flex-col bg-slate-200 w-52 rounded-lg justify-center items-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <img
            src={quality}
            className=" w-20  bg-gray-950 rounded-full mt-3 p-3 "
          />
          <p className="flex font-normal text-2xl mt-6">Quality Product</p>
          <p className="flex font-light mb-6 text-center p-1">
          Excellence Unwrapped: Uncompromising Quality, Delivered to Your Doorstep.

          </p>
        </div>
        <div className="flex flex-col bg-slate-200 w-52 rounded-lg justify-center items-center hover:shadow-2xl transition duration-300 hover:scale-105">
          <img
            src={support}
            className=" w-20  bg-gray-950 rounded-full mt-3 p-2 "
          />
          <p className="flex font-normal text-2xl mt-6">24/7 Service</p>
          <p className="flex font-light mb-6 text-center p-1">
          Always On, Always Ready: 24/7 Service for Your Convenience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact