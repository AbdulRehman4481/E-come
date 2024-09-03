import React, { useState } from "react";
import Button from "../Button/Button";
import ProductCard from "../ProductCard/ProductCard";
import ZoomProduct from "../ZoomProduct/ZoomProduct";
import ProductBar from "../ProductBar/ProductBar";
import Image from "next/image";
import image2 from "../../../public/assets/Images/h3_b2.jpg";
import image4 from "../../../public/assets/Images/h3_b3.jpg";

import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Product from "../../data/product.json";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute flex border-1 left-1 sm:-left-5 bg-white top-[45%] h-10 justify-center items-center w-10 transform -translate-y-1/2 z-10 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <IoIosArrowBack color="black" size={20} />
    </div>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute flex border-1 right-1 sm:-right-2 bg-white top-[45%] h-10 justify-center items-center w-10 transform -translate-y-1/2 z-10 cursor-pointer rounded-lg"
      onClick={onClick}
    >
      <IoIosArrowForward color="black" size={20} />
    </div>
  );
};

export default function TopProduct() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAfterChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 624,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
    customPaging: (i) => (
      <div
        className={`w-4 h-4 rounded-full ${
          i === activeIndex ? "bg-primary" : "bg-gray-500"
        } transition-colors duration-200`}
      />
    ),
    appendDots: (dots) => (
      <div className="absolute flex flex-col justify-center w-full">{dots}</div>
    ),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="flex justify-center items-center mt-20 px-4">
      <div className="flex flex-col lg:flex-row gap-5">
        <ProductBar />
        <div className=" ">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <Button text={"Featured"} size={"lg"} />
            <Button text={"Top Rated"} size={"lg"} />
            <Button text={"New Arrivals"} size={"lg"} />
          </div>
          <div className="max-[915px]:flex max-[915px]:justify-center">
            <div
              id="top-product"
              className="relative w-[900px] max-[915px]:w-[600px] max-[615px]:w-[350px] lg:ml-5 h-fit mt-10"
            >
              <Slider {...settings}>
                {Product.map((pro, i) => {
                  return (
                    <div key={i}> 
                      <ProductCard id={pro.id} image={pro.image} category={pro.category} name={pro.name } price={pro.price} />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-6">
            <ZoomProduct image={image2} sale={"30"} title={"Kbox Controller"} />
            <ZoomProduct image={image4} sale={"30"} title={"Smart Watch"} />
          </div>
        </div>
      </div>
    </div>
  );
}
