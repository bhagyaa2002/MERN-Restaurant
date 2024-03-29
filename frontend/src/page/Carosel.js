import React, { useEffect } from "react";

import BiryaniImg1 from "../assest/ice-cream3.png";
import BiryaniImg2 from "../assest/vege-7.png";
import BiryaniImg3 from "../assest/biryani2.png";
import Mixfruit from "../assest/Mix fruits1.png";
import Vector from "../assest/vector3.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
const ImageList = [
  {
    id: 1,
    img: BiryaniImg1,
  },
  {
    id: 2,
    img: BiryaniImg2,
  },
  {
    id: 3,
    img: BiryaniImg3,
  },
  {
    id: 4,
    img: Mixfruit,
  },
];

const Carosel = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 5000,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const [imageId, setImageId] = React.useState(BiryaniImg1);

  const bgImage = {
    
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  useEffect(() => {
    // Change image every 5 seconds
    const intervalId = setInterval(() => {
      // Get the index of the current image
      const currentIndex = ImageList.findIndex((item) => item.img === imageId);

      // Calculate the index of the next image
      const nextIndex = (currentIndex + 1) % ImageList.length;

      // Set the next image
      setImageId(ImageList[nextIndex].img);
    }, 4000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [imageId]);

  return (
    <>
      <div
        className="min-h-[550px] sm:min-h-[600px] bg-gray-950 text-white flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
        style={bgImage}
        
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos="zoom-out"
              data-aos-duration="400"
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                Welcome{" "}
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">
                  Foodie
                </span>{" "}
                Zone
              </h1>
              {/* <p className="text-sm ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                reiciendis inventore iste ratione ex alias quis magni at optio
              </p> */}
              <p className="py-3 text-xl ">
          Welcome to Foodizo – Your one-stop culinary destination! Dive into a world of deliciousness as we bring you fresh vegetables, juicy fruits, tempting cakes, creamy ice creams, and a variety of beverages, all conveniently delivered to your doorstep. Our website is designed for simplicity and ease, ensuring that your experience is both understandable and enjoyable. Whether you're in the mood for wholesome veggies or indulgent desserts, Foodizo has you covered. Discover the joy of flavorful and hassle-free dining – your favorite treats are just a click away!
          </p>
              <div>
              <Link to={`/menu/659406f93b93bd0168a36af6`}>
                <button className="hover:scale-105 duration-200 text-white py-2 px-4 rounded-full" style={{ backgroundColor: '#D94E28' }}>
                  Order Now
                </button>
                
           {/* <button className="font-bold  text-slate-200 px-4 py-2 rounded-full" style={{ backgroundColor: '#D94E28' }} >  */}
          
            {/* Order Now
          </button> */}
          </Link>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  data-aos-once="true"
                  src={imageId}
                  alt="biryani img"
                  className="w-[300px] sm:w-[450px] sm:scale-125  mx-auto spin "
                />
              </div>
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-40 justify-center gap-4 absolute bottom-[0px] lg:-right-10 bg-white/30 rounded-full">
                {ImageList.map((item) => (
                  <img
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-once="true"
                    src={item.img}
                    onClick={() => {
                      setImageId(
                        item.id === 1
                          ? BiryaniImg1
                          : item.id === 2
                          ? BiryaniImg2
                          :item.id===3? BiryaniImg3:Mixfruit
                      );
                    }}
                    alt="biryani img"
                    className="max-w-[80px] h-[80px] object-contain inline-block hover:scale-105 duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carosel;
