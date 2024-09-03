import React from "react";
import Image from "next/image";
import image1 from "../../../public/assets/Images/VivoX200-b.jpg";

export default function ProductBar() {
  return (
    <div className="w-full sm:w-auto">
      <ul className="border rounded-lg bg-white">
        <li className="font-semibold text-lg sm:text-xl p-4">Top Product</li>
        <li className="flex p-4 items-center">
          <div className="border p-2 rounded-lg">
            <Image
              src={image1}
              className="w-16 h-20 object-contain"
              alt="Samsung Ultra"
            />
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-sm sm:text-base">Samsung Ultra</h1>
            <h1 className="font-semibold text-[#898e92] mt-2 text-sm sm:text-base">$78.00</h1>
          </div>
        </li>
        <hr />
        <li className="flex p-4 items-center">
          <div className="border p-2 rounded-lg">
            <Image
              src={image1}
              className="w-16 h-20 object-contain"
              alt="Samsung Ultra"
            />
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-sm sm:text-base">Samsung Ultra</h1>
            <h1 className="font-semibold text-[#898e92] mt-2 text-sm sm:text-base">$78.00</h1>
          </div>
        </li>
        <hr />
        <li className="flex p-4 items-center">
          <div className="border p-2 rounded-lg">
            <Image
              src={image1}
              className="w-16 h-20 object-contain"
              alt="Samsung Ultra"
            />
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-sm sm:text-base">Samsung Ultra</h1>
            <h1 className="font-semibold text-[#898e92] mt-2 text-sm sm:text-base">$78.00</h1>
          </div>
        </li>
        <hr />
        <li className="flex p-4 items-center">
          <div className="border p-2 rounded-lg">
            <Image
              src={image1}
              className="w-16 h-20 object-contain"
              alt="Samsung Ultra"
            />
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-sm sm:text-base">Samsung Ultra</h1>
            <h1 className="font-semibold text-[#898e92] mt-2 text-sm sm:text-base">$78.00</h1>
          </div>
        </li>
        <hr />
        <li className="flex p-4 items-center">
          <div className="border p-2 rounded-lg">
            <Image
              src={image1}
              className="w-16 h-20 object-contain"
              alt="Samsung Ultra"
            />
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-sm sm:text-base">Samsung Ultra</h1>
            <h1 className="font-semibold text-[#898e92] mt-2 text-sm sm:text-base">$78.00</h1>
          </div>
        </li>
      </ul>
    </div>
  );
}
