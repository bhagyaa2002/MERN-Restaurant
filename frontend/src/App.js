import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet,useLocation} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./component/Footer";

function App() {
  const dispatch=useDispatch()
  const productData=useSelector((state)=>state.product)
  const location = useLocation();
  
  useEffect(()=>{
    (async()=>{
      const res=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData=await res.json()
      dispatch(setDataProduct(resData))
    })()
    console.log('Current Path:', window.location.pathname);
console.log('Condition:', !(window.location.pathname === '/login' || window.location.pathname === '/signup'));

  },[])
  
  
  return (
    <> 
    {/* style={{ backgroundColor: '#fffbeb' }} */}
      <Toaster />
      <div>
        <Header productData={productData}/>
        <main className="pt-16  min-h-[calc(100vh)]" style={{ backgroundColor: '#fcfce1' }} >
          <Outlet />
        </main>
        {!(location.pathname.toLowerCase() === '/login' || location.pathname.toLowerCase() === '/signup') && <Footer />}

      </div>
    </>
  );
}

export default App;
