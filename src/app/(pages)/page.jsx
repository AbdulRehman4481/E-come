"use client";

import dynamic from "next/dynamic";
const Categories = dynamic(() => import('../../(components)/Categories/Categories'), { ssr: false })
const Feature = dynamic(() => import('../../(components)/Feature/Feature'), { ssr: false })
const FreeShipping = dynamic(() => import('../../(components)/FreeShipping/FreeShipping'), { ssr: false })
const Hero = dynamic(() => import('../../(components)/Hero/Hero'), { ssr: false })
const ProductList = dynamic(() => import('../../(components)/ProductList/ProductList'), { ssr: false })
const SuperDeals = dynamic(() => import('../../(components)/SuperDeals/SuperDeals'), { ssr: false })
const TopProduct = dynamic(() => import('../../(components)/TopProduct/TopProduct'), { ssr: false })
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


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
