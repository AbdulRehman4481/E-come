import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { TbHelpTriangleFilled } from "react-icons/tb";

export default function Feature() {
  return (
    <div className="grid   justify-center items-center my-14">
      <div className="max-w-[1100px flex flex-wrap  justify-center items-center">
        <div className="flex flex-col max-w-72 text-center justify-center items-center ">
          <span className="text-[#e66465]">
            <CiDeliveryTruck size={50} />
          </span>
          <h1 className="text-lg font-semibold">WorldWide Delivery</h1>
          <span className="text-sm font-semibold">
            With sites in 5 languages, we ship to over 200 countries & regions.
          </span>
        </div>
        <div className="flex flex-col max-w-72 text-center justify-center items-center ">
          <span className="text-[#e66465]">
            <MdOutlinePayment size={50} />
          </span>
          <h1 className="text-lg font-semibold">Safe Payment</h1>
          <span className="text-sm font-semibold">
            Pay with the world’s most popular and secure payment methods.
          </span>
        </div>
        <div className="flex flex-col max-w-72 text-center justify-center items-center ">
          <span className="text-[#e66465]">
            <AiOutlineSafety size={50} />
          </span>
          <h1 className="text-lg font-semibold">Shop With Confidence</h1>
          <span className="text-sm font-semibold">
            Our Buyer Protection covers your purchase from click to delivery.
          </span>
        </div>
        <div className="flex flex-col max-w-72 text-center justify-center items-center ">
          <span className="text-[#e66465]">
            <TbHelpTriangleFilled size={50} />
          </span>
          <h1 className="text-lg font-semibold">24/7 Help Center</h1>
          <span className="text-sm font-semibold">
            Round-the-clock assistance for a smooth shopping experience.
          </span>
        </div>
      </div>
    </div>
  );
}
