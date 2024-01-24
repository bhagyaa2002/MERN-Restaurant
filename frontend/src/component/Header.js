import React, { useEffect, useRef, useState } from "react";
import logo from "../assest/foodizo8.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import SearchCard from "./SearchCard";
import { loginRedux } from "../redux/userSlice";
const Header = ({ productData }) => {

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser);
    if(storedUser===null){
      console.log("line 18");
    }
    else{
      console.log("line 21");
      dispatch(loginRedux(storedUser))
    }
    const handleOutsideClick = (e) => {
      // Check if the clicked element is not part of the profile icon
      if (
        !e.target.closest(".text-slate-600") &&
        !e.target.closest(".text-3xl") &&
        !e.target.closest(".drop-shadow-md")
      ) {
        setShowMenu(false);
        setSearchInput("");
    setIsInputFocused(false);
    setlistOfProducts([])
      }

      
    };  // Add the event listener to handle outside clicks
    window.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };

    
  }, []);




  const [showMenu, setShowMenu] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const userData = useSelector((state) => state.user);

  console.log("line 12 in header JS", userData.email);
  console.log("line 13", productData.productList);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleShowMenuNew = () => {
    setShowMenu(false);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    localStorage.setItem('user', JSON.stringify(null));

    toast("Logout Successfully");
    navigate("/")

  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  const location = useLocation();
  const inputRef = useRef(null);

  const inputWidth = inputRef.current?.offsetWidth || "100%";
  const handleClick = () => {
    
    console.log("line 8 click");
    setIsInputFocused(true)
    // navigate(`/menu/${id}`)
  };
  const [searchInput,setSearchInput] = useState("")
  const [listOfProducts,setlistOfProducts]= useState( productData.productList)
  const handleChange = (value)=>{
    setIsInputFocused(true)
    setSearchInput(value)
   const result= productData.productList.filter((item)=>{
      return item && item.name && item.name.toLowerCase().includes(value.toLowerCase())
    })
    setlistOfProducts(result)
    console.log("line 47",listOfProducts);
    
  }

  const clearSearchInput = () => {
    console.log("inside lear search");
    setSearchInput("");
    setIsInputFocused(false);
    setlistOfProducts([])
  };


  return (
    <div>
      <div className="flex">
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-gradient-to-r from-gray-700 to-yellow-300">
          <div className="flex items-center h-full justify-between">
            <Link to={""}>
              <div className=" ml-6 h-10">
                <img src={logo} className="h-full" />
              </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-7 w-full">
              <div className="flex w-full mr-12 ml-32 relative"  onClick={handleShowMenuNew} >
                <input
                  type="text"
                  className=" bg-slate-100 border-radius-3  w-full rounded p-1 focus-within:outline focus-within:outline-slate-200"
                 
                  placeholder= {isInputFocused===true?"":"       Search"}
                  onFocus={() => setIsInputFocused(!isInputFocused)}
                  // onBlur={()=>setIsInputFocused(false)}
                  value={searchInput}
                  onChange={(e)=>handleChange(e.target.value)}
                  onClick={handleClick}
                ></input>
                {isInputFocused || (
                  <>
                    <div className="absolute ml-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaSearch />
                    </div>
                  </>
                )}

                {isInputFocused &&listOfProducts&&listOfProducts.length>0 ?(
                  <>
                  <div
                    className="absolute bg-white border border-gray-300 mt-9 p-2 mr-10 rounded max-h-40  overflow-scroll scrollbar-none "
                    style={{ width: inputWidth }} onClick={() => setIsInputFocused(false)}
                  >
                    {listOfProducts.map((el) => (
                      <SearchCard id={el._id} name={el.name} clearSearchInput={clearSearchInput}/>
                    ))}
                    
                  </div>
                  </>
                ):<></>}
              </div>
              <div onClick={handleShowMenuNew}>
              <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex ">
                <Link
                  to={""}
                  className={
                    location.pathname === "/"
                      ? "text-red-500 text-xl font-bold"
                      : "text-black"
                  }
                >
                  Home
                </Link>
                <Link
                  to={"menu/659406f93b93bd0168a36af6"}
                  className={
                    location.pathname.includes("/menu")
                      ? "text-red-500 text-xl font-bold"
                      : "text-black"
                  }
                >
                  Menu
                </Link>
                {/* <Link
                  to={"about"} 
                  className={
                    location.pathname === "/about"
                      ? "text-red-500 text-xl font-bold"
                      : "text-black"
                  }
                >
                  About
                </Link>  */}
                <Link
                  to={"contact"}
                  className={
                    location.pathname === "/contact"
                      ? "text-red-500 text-xl font-bold"
                      : "text-black"
                  }
                >
                  About
                </Link>
                <Link
                  to={"order"}
                  className={
                    location.pathname === "/order"
                      ? "text-red-500 text-xl font-bold"
                      : "text-black"
                  }
                >
                  Order
                </Link>
                {/* <Link to={"order"} className={location.pathname === '/order' ? 'text-red-500' : 'text-black'}>Order</Link> */}
              </nav>
              </div>
              <div className="text-2xl text-slate-600 relative" onClick={handleShowMenuNew}>
                <Link to={"cart"}>
                  <BsCartFill />
                  <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                    {cartItemNumber.length}
                  </div>
                </Link>
              </div>
              <div className="text-slate-600" onClick={handleShowMenu}>
                <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                  {userData.image ? (
                    <img src={userData.image} className="h-full w-full" />
                  ) : (
                    <HiOutlineUserCircle />
                  )}
                </div>
                {showMenu && (
                  <div className="absolute right-1 mt-4  bg-white px-2 py-2 shadow drop-shadow-md text-base flex flex-col min-w-[120px] text-center">
                    {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                      <Link
                        to={"NewProduct"}
                        className="whitespace-nowrap cursor-pointer hover:bg-red-100"
                      >
                        New product
                      </Link>
                    )}

                    {userData.image ? (
                      <p
                        className="cursor-pointer hover:bg-red-100 px-2"
                        onClick={handleLogout}
                      >
                        Logout 
                      </p>
                    ) : (
                      <Link
                        to={"Login"}
                        className="whitespace-nowrap cursor-pointer"
                      >
                        Login
                      </Link>
                    )}
                    {/* <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">Home</Link>
                  <Link to={"contact"} className="px-2 py-1">Menu</Link>
                  <Link to={"about"} className="px-2 py-1">About</Link>
                  <Link to={"contact"} className="px-2 py-1">Contact</Link>
                </nav> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
      {/* <div className="flex">
     <p className="bg-black">hiiii</p>
   </div> */}


    </div>
  );
};
export default Header;
