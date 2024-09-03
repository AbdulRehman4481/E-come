import Image from "next/image";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function ZoomProduct({ image, title, sale }) {
  return (
    <div className="relative group cursor-pointer">
      <div className="overflow-hidden">
        <Image src={image} alt="kjshkj" width={400} height={450}  className="transform transition-transform duration-700 ease-in-out group-hover:scale-125" />
      </div>
      <div className="absolute top-10 px-8">
        <h1 className="font-bold text-xl">{title}</h1>
        <h1 className="text-base font-medium text-[#999999] md:mb-5">
          Sale Up {sale}%
        </h1>

        <button className="flex justify-center items-center text-red-600">
          Shop Now{" "}
          <IoIosArrowBack color="red" size={10} className="rotate-180 mt-1 " />
        </button>
      </div>
    </div>
  );
}
