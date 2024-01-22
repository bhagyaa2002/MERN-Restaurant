import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import HomeCard from '../component/HomeCard';
import CardFeature from '../component/CardFeature';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';
import { Link } from 'react-router-dom';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);

  const homeProductCardList = productData.slice(1, 5);
  const homeProductCardListVegetables = productData.filter((el) => el.category === 'vegetable', []);
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  const slideProductRef = useRef();
  
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

 
  
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className="md:w-1/2">
        <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery to{" "}
            <span className="" style={{color: '#D94E28'}}>Your Home</span>
          </h2>
          <p className="py-3 text-base ">
          Welcome to Foodizo – your one-stop culinary destination! Dive into a world of deliciousness as we bring you fresh vegetables, juicy fruits, tempting cakes, creamy ice creams, and a variety of beverages, all conveniently delivered to your doorstep. Our website is designed for simplicity and ease, ensuring that your experience is both understandable and enjoyable. Whether you're in the mood for wholesome veggies or indulgent desserts, Foodizo has you covered. Discover the joy of flavorful and hassle-free dining – your favorite treats are just a click away!
          </p>
          <Link to={`/menu/659406f93b93bd0168a36af6`}>
          <button className="font-bold  text-slate-200 px-4 py-2 rounded-md" style={{ backgroundColor: '#D94E28' }} >
            Order Now
          </button>
          </Link>

        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCardList[0] ? (
            homeProductCardList.map((el) => (
              <HomeCard
                
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            ))
          ) : (
            loadingArray.map((el, index) => (
              <HomeCard key={index+"loading"} loading={"Loading..."} />
            ))
          )}
        </div>
      </div>

      <div className=''>
        <div className='flex w-full items-center'>
        <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
          
        </div>

        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {homeProductCardListVegetables[0] ? (
            homeProductCardListVegetables.map((el) => (
              <CardFeature
                key={el._id+"vegetable "}
                id={el._id} 
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
              />
            ))
          ) : (
            loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index + 'cartLoading'} />)
          )}
        </div>
      </div>
     
     <AllProduct heading={"Your Product"} />
     
    </div>
  );
};

export default Home;
