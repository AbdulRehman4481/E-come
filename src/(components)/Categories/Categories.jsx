import React from "react";

export default function Categories() {
  return (
    <div className="px-4 py-2">
      <div className="flex justify-center">
        <ul className="flex flex-wrap gap-3 sm:gap-5 rounded-lg justify-center">
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            All New Arrivals
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Top Seller
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Laptops
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Computers
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Camera
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Cell Phones
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Accessories
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            Headphone
          </li>
          <li className="text-sm sm:text-base md:text-lg text-[#898e92] font-medium cursor-pointer rounded-md p-2">
            All Categories
          </li>
        </ul>
      </div>
    </div>
  );
}
