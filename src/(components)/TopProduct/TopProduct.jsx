import { useEffect, useState } from "react";
import image2 from "../../../public/assets/Images/h3_b2.jpg";
import image4 from "../../../public/assets/Images/h3_b3.jpg";
import Button from "../Button/Button";
import ProductBar from "../ProductBar/ProductBar";
import ProductCard from "../ProductCard/ProductCard";
import ZoomProduct from "../ZoomProduct/ZoomProduct";

import Slider from "react-slick";
import Products from "../../data/product.json";

export default function TopProduct() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [filterText, setTilterText] = useState("Featured");
  const [showProduct, setShowProduct] = useState([]);
  const sortedProducts = Products.sort((a, b) => a.rating - b.rating);
  const computers = Products.filter((pro) => pro.category === "computer");
  const handleAfterChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };
  useEffect(() => {
    if (filterText === "Featured") {
      setShowProduct(Products);
    } else if (filterText === "Top Rated") {
      setShowProduct(sortedProducts);
    } else if (filterText === "Computer") {
      setShowProduct(computers);
    }
  }, [filterText,computers,sortedProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
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
    afterChange: handleAfterChange,
    customPaging: (i) => (
      <div
        className={`w-4 h-4  rounded-full ${
          i === activeIndex ? "bg-primary" : "bg-gray-500"
        } transition-colors duration-200`}
      />
    ),
    appendDots: (dots) => (
      <div className="absolute flex flex-col justify-center w-full mt-9">{dots}</div>
    ),
  };

  return (
    <div className="flex justify-center items-center mt-20 px-4" id="deal-container">
      <div className="flex max-[1100px]:flex-col flex-row gap-5">
        <ProductBar sortedProducts={sortedProducts} heading={"Top Product"} />
        <div className=" ">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <Button
              text={"Featured"}
              size={"lg"}
              click={() => setTilterText("Featured")}
            />
            <Button
              text={"Top Rated"}
              size={"lg"}
              click={() => setTilterText("Top Rated")}
            />
            <Button
              text={"Computer"}
              size={"lg"}
              click={() => setTilterText("Computer")}
            />
          </div>
          <div className="max-[915px]:flex max-[915px]:justify-center mt-10 ">
            <div
              id="top-product"
              className="relative max-w-[950px] max-[1150px]:max-w-[900px] max-[923px]:w-[700px] max-[776px]:w-[600px] max-[620px]:w-[300px] lg:ml-5 h-fit "
            >
              <Slider {...settings}>
                {showProduct?.slice(0, 5).map((pro, i) => {
                  return (
                    <div key={i}>
                      <ProductCard
                        id={pro.id} mt-10
                        image={pro.image}
                        category={pro.category}
                        name={pro.name}
                        price={pro.price}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-6 mt-10">
            <ZoomProduct image={image2} sale={"30"} title={"Kbox Controller"} />
            <ZoomProduct image={image4} sale={"30"} title={"Smart Watch"} />
          </div>
        </div>
      </div>
    </div>
  );
}
