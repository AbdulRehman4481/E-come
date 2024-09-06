import Image from "next/image";
import React, { useState } from "react";
import image1 from "../../../public/assets/Images/headphone.jpg";
import ProductBar from "../ProductBar/ProductBar";
import Slider from "react-slick";
import Product from "../../data/product.json";
import { useDisclosure } from "@nextui-org/react";
import DetailModal from "../DetailModaldad/DetailModal";

export default function SuperDeals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    isOpen: isDetailOpen,
    onOpen: onOpenDetail,
    onOpenChange: onDetailOpenChange,
  } = useDisclosure();
  const [productId, setProductId] = useState("");

  const sortedProducts = Product.filter((prod) => prod.discount);

  const dealProduct = Product.filter((prod) => prod.discount >= 49);

  const handleAfterChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };
  const handleProductClick = (product) => {
    setProductId(product.id);
    onOpenDetail();
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full ${
          i === activeIndex ? "bg-black" : "bg-gray-300"
        } transition-colors duration-200`}
      />
    ),
    appendDots: (dots) => <div className="w-full">{dots}</div>,
  };

  return (
    <>
      <div
        className="my-20 flex flex-col  md:flex-row gap-6 justify-center items-center max-w-full overflow-hidden "
        id="deal-container"
      >
        <div className="relative mb-10 h-[400px] sm:h-[500px] w-full md:w-[70%] lg:w-[60%]">
          <Slider {...settings}>
            {dealProduct.map((pro, i) => (
              <div key={i} className="cursor-pointer">
                <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-10 border-2 border-[#e66465] rounded-md h-full p-4 md:p-6">
                  <div className="text-center md:text-left">
                    <h1 className="text-xl md:text-3xl font-medium text-[#898e92] mb-2 md:mb-3">
                      SuperDeals
                    </h1>
                    <h1 className="text-xl md:text-3xl font-medium mb-2 md:mb-3">
                      {pro.name}{" "}
                    </h1>
                    <h1 className="text-lg md:text-xl font-medium mb-2 md:mb-3">
                      Categories:{pro.category}
                    </h1>
                    <h1 className="text-xl md:text-3xl font-medium text-red-500 mb-2 md:mb-3">
                      ${pro.price}{" "}
                      <span className="text-sm md:text-base font-medium text-[#898e92]">
                        {pro.discount}%
                      </span>
                    </h1>
                    <h1 className="text-lg md:text-xl font-medium text-[#898e92]">
                      Available Product:{" "}
                      <span className="text-lg md:text-xl font-medium text-red-500">
                        22
                      </span>
                    </h1>
                    <h1 className="text-sm font-medium text-[#333333]">
                      Deal End: <br />
                      {pro.offerEnd}
                    </h1>
                  </div>
                  <div
                    onClick={() => handleProductClick(pro)}
                    className="flex flex-col items-center"
                  >
                    <Image
                      src={pro.image}
                      width={200}
                      height={200}
                      alt="product"
                      className="md:w-[300px] md:h-[300px]"
                    />
                    <div className="flex gap-2 md:gap-5 mt-3">
                      {[...Array(3)].map((_, j) => (
                        <Image
                          key={j}
                          src={pro.image}
                          width={60}
                          height={60}
                          alt="product-thumbnail"
                          className="border rounded-lg p-1 md:p-3"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full md:w-[30%] lg:w-[25%] max-[640px]:mt-32">
          <ProductBar
            sortedProducts={sortedProducts}
            heading={"Product on Sale"}
          />
        </div>
      </div>
      <DetailModal
        isOpen={isDetailOpen}
        onOpen={onOpenDetail}
        onOpenChange={onDetailOpenChange}
        detailId={productId}
      />
    </>
  );
}
