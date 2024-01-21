import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [data, setData] = useState({
    
    email: "",
    password: "",
    
  });
  const navigate=useNavigate()

  const userData=useSelector(state=>state.user)
  console.log(userData);

  const dispatch=useDispatch()



  console.log("line 29 login JS: ",data);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
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

  const handleSubmit=async(e)=>{
    e.preventDefault() //when you press signup button it will not refresh the page

    const {email,password}=data
    if(email && password){
      const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/Login`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
       const dataRes=await fetchData.json()

       
       console.log("datares",dataRes)
    
       toast(dataRes.message)
       
       
       if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        localStorage.setItem('user', JSON.stringify(dataRes));
        console.log("line 65 in login JS",dataRes);
        setTimeout(()=>{
          navigate("/")
        })//delay in 1sec for displaying login successfully
        
       }
       
    }
    else{
      alert("Please enter required fields")
    }
  }
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto  flex-col p-4">
        {/*<h1 className='text-center text-2xl font-bold'>SignUp</h1>*/}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} />
        </div>
        <form className="w-full py-3 flex-col" onSubmit={handleSubmit}>
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

          <div className="flex items-center justify-center">
            <button className="w-full max-w-[150px] bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Login
            </button>
          </div>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account?{" "}
          <Link to={"/SignUp"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login