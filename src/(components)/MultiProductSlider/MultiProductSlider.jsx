import React from "react";
import Slider from "react-slick";
import ProductCard from "../ProductCard/ProductCard";

export default function MultiProductSlider() {
  const settings = {
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
  };
  return (
    <div className="flex justify-center ">
      <div className="relative max-w-[1100px]">
        <Slider {...settings}>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
        </Slider>
      </div>
    </div>
  );
}
