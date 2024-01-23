import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "react";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import bcrypt from "bcryptjs";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault(); //when you press signup button it will not refresh the page
    //     const saltRounds = 10; // You can adjust the number of salt rounds

    // // Generate a salt
    // const salt = bcrypt.genSaltSync(saltRounds);

    // // Hash the password with the salt
    // const hashedPassword = bcrypt.hashSync(password, salt);
    // const hashedCOnfirmPassword = bcrypt.hashSync(confirmPassword, salt);
    // console.log();

    const { firstName, email, password, confirmPassword } = data;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isValidPassword = passwordRegex.test(password);
    console.log("line 68", isValidPassword);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(
      password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );
    console.log("hashed", hashedPassword);

    const hashedConfirmedPassword = bcrypt.hashSync(
      confirmPassword,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );

    console.log(data);
    // data.password = hashedPassword;
    // data.confirmPassword = hashedConfirmedPassword;
    if (firstName && email && password && confirmPassword) {
      if (isValidPassword) {
        if (password === confirmPassword) {
          const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmedPassword,
            image: data.image,
          };
          const fetchData = await fetch(
            `${process.env.REACT_APP_SERVER_DOMAIN}/SignUp`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );
          const dataRes = await fetchData.json();

          //alert(dataRes.message);
          toast(dataRes.message);
          if (dataRes.alert) {
            navigate("/Login");
          }
        } else {
          toast("Password and confirm password not equal");
        }
      } else {
        toast("Password shouldhave min length 8");
      }
    } else {
      toast("Please enter required fields");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto  flex-col p-4">
        {/*<h1 className='text-center text-2xl font-bold'>SignUp</h1>*/}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full h-full"
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>
        <form className="w-full py-3 flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">LastName</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-400"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-400">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-400">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <button className="w-full max-w-[150px] bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-left text-sm mt-2">
          Already have account?{" "}
          <Link to={"/Login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
