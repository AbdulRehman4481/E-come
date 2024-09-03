import React from "react";
import image1 from "../../../public/assets/Images/h3_b1.jpg";
import Image from "next/image";
export default function FreeShipping() {
  return (
    <div className="relative flex justify-center p-4">
      <div className="">
        <Image src={image1} alt="kdljk" className="max-w-full" />
      </div>
      <div className="absolute top-[30%] md:top-[50%] text-center">
        <h1 className="text-xl md:text-5xl md:mb-3 text-white">
          Free Shipping on Orders $50
        </h1>
        <span className="cursor-pointer text-white">
          <u>Shop Now</u>
        </span>
      </div>
    </div>
  );
}
