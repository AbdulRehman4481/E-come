"use client";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Categories from "../../(components)/Categories/Categories";
import Feature from "../../(components)/Feature/Feature";
import FreeShipping from "../../(components)/FreeShipping/FreeShipping";
import Hero from "../../(components)/Hero/Hero";
import ProductList from "../../(components)/ProductList/ProductList";
import SuperDeals from "../../(components)/SuperDeals/SuperDeals";
import TopProduct from "../../(components)/TopProduct/TopProduct";

export default function Home() {
  return (
    <>
      <div>
        <Categories />
        <Hero />
        <Feature />
        <TopProduct />
        <SuperDeals />
        <FreeShipping />
        <ProductList />
      </div>
    </>
  );
}
5;
