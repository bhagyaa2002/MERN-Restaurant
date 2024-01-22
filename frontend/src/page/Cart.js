import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import empty from "../assest/emptycart.json";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
 

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      console.log("Server Domain:", process.env.REACT_APP_SERVER_DOMAIN);

      const payload= {
        productCartItem:productCartItem,
        userId:user._id
      }
      console.log("line 37",payload);

      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 500) return;
      const data = await res.json();
      console.log(data);

      toast("Redirect to payment Gateway...!");
      //const checkoutUrl = `https://checkout.stripe.com/pay/${data}`;
    //  const newTab= window.open(data, '_blank');
    //   setTimeout(() => {
    //     newTab.close();
    //   }, 10000);

      await stripePromise.redirectToCheckout({ sessionId: data});
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty, // the path to your animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-2 md:p-4">
      <h3 className="text-lg md:text-2xl font-bold text-slate-600">
        My Cart Items
      </h3>
      {productCartItem[0] ? (
        <div className="my-4 flex gap-3">
          {/* display cart items */}
          <div className="w-full max-w-3xl">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>

          {/* total cart items */}
          <div className="w-full max-w-md ml-auto ">
            <h2 className=" bg-red-500 text-2xl mb-3 p-2">Summary </h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b ">
              <p>Total Price :</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span>
                {totalPrice}{" "}
              </p>
            </div>
            <button
              className="bg-blue-500 w-full text-lg font-bold  p-2 text-white rounded-lg hover:shadow-2xl transition duration-200 hover:scale-105"
              onClick={handlePayment}
            >
              Pay
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center flex-col">
          {/* <img src={emptyCartImage} className="w-full max-w-sm" /> */}
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className=" text-3xl font-bold">Empty Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;

