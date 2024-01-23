import React from "react";
import { Link } from "react-router-dom";
import support from "../assest/24-hours-support.png";
import delivery from "../assest/fast-delivery.png";
import best from "../assest/best-seller.png";
import insta from "../assest/instagram.png";
import whatsapp from "../assest/whatsapp.png";
import twitter from "../assest/twitter.png";
import mail from "../assest/mail.png";
import address from "../assest/location.png";
import call from "../assest/call.png";
const Footer = () => {
  return (
    <div className="flex justify-around bg-gray-950 pt-6">
      <div className="flex flex-col text-white  w-1/5 h-1/5 items-start justify-center mb-9">
        <div className="flex">
          {" "}
          <img src={address} className="w-6 h-6 mr-3" />
          <p className="text-xl font-semibold mb-4">Address</p>
        </div>
        <p className="">Natural Fresh PVT LTD</p>
        <p className="">2-1/24, Hustle Hub</p>
        <p className="">3rd cross,8th main </p>
        <p className="">Basavanagudi</p>
        <p className="">Bengaluru-560001</p>
      </div>
      <div className="flex flex-col text-white w-1/5 h-1/5 items-start justify-center">
        <p className="text-xl font-semibold mb-4">Links</p>
        <Link to={"/"}>Home</Link>
        <Link to={"/menu/659406f93b93bd0168a36af6"}>Menu</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/order"}>Order</Link>
      </div>
      <div className="flex flex-col  text-white w-1/5 h-1/5 items-start justify-start ">
        <p className="mb-4 text-xl font-semibold">Support</p>
        <div className="flex">
          <img src={mail} className="w-6 h-6 mr-3" />
          <p className="">support@naturefresh.com</p>
        </div>
        <div className="flex mt-3">
          <img src={call} className="w-6 h-6 mr-3" />
          <p className="">123-456-7890</p>
        </div>
      </div>
      <div className="flex flex-col text-white w-1/5 h-1/5 items-start ">
        <p className="mb-4 text-xl font-semibold">Connect With Us</p>
        <div className="flex">
          <img src={insta} className="w-6 h-6 mr-3" />
          <img src={whatsapp} className="w-6 h-6 mr-3" />
          <img src={twitter} className="w-6 h-6 mr-3" />
          <img src={mail} className="w-6 h-6 mr-3" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
