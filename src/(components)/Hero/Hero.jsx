"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import Image1 from "../../../public/assets/Images/h3_s1.jpg";
import Image2 from "../../../public/assets/Images/h3_s2.jpg";
import Image3 from "../../../public/assets/Images/h3_s3.jpg";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa";
import {  useDisclosure } from "@nextui-org/react";

const testimonials = [
  {
    image: Image1,
    name: "Sadjk",
    description: "Drone is Coming Soon",
  },
  {
    image: Image2,
    name: "Name2",
    description: "Drone is Coming Soon",
  },
  {
    image: Image3,
    name: "Name3",
    description: "Drone is Coming Soon",
  },
];

export default function Hero() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      <div className="flex justify-center items-center max-w-full mt-10">
        <div className="relative w-full max-w-[1200px]">
          <Slider
            {...settings}
            className="flex justify-center items-center cursor-pointer"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="w-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    layout="responsive"
                    width={1200}
                    height={800}
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
                  <h1 className="text-[#898e92] text-xl font-semibold mb-1">
                    Coming Product
                  </h1>
                  <h1 className="text-3xl md:text-[60px] sm:my-5">
                    {testimonial.description}
                  </h1>
                  <h1 className="text-[#898e92] font-bold text-lg mb-1">
                    From <span className="text-[#e66465] text-2xl">669</span>
                  </h1>
                  <button className="flex justify-center items-center bg-gradient-to-r from-[#e66465] to-[#f8ccb3] text-white p-2 sm:p-5 rounded-full my-5 hover:shadow-custom-light">
                    Buy Now <FaAngleRight />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
