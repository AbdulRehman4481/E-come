"use client";
import React, { useEffect, useState } from "react";
import Categories from "../../../(components)/Categories/Categories";
import product from "../../../data/product.json";
import ProductCard from "@/(components)/ProductCard/ProductCard";
export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

  useEffect(() => {
    if (typeof window === "object") {
      const urlParams = new URLSearchParams(window.location.search);
      const initialCategory = urlParams.get("category");
      if (initialCategory) {
        setSelectedCategory(initialCategory);
      }
    }
  }, []);

  const handleCategoryChange = (newCategory) => {
    if (typeof window === "object") {
      setSelectedCategory(newCategory);

      // Update the URL with the new category
      const url = new URL(window.location);
      url.searchParams.set("category", newCategory);
      window.history.pushState({}, "", url);
    }
  };

  const filteredProducts = product.filter(
    (pro) => pro.category.toLowerCase() === selectedCategory.toLocaleLowerCase()
  );
  return (
    <div>
      <Categories handleCategoryChange={handleCategoryChange} />{" "}
      <div>
        <div className="flex flex-row justify-center items-center my-10">
          <div className="h-1 w-52 bg-black" />
          <h1 className="text-4xl mx-2">Product List </h1>
          <div className="h-1 w-52 bg-black" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredProducts.length != 0 ? (
            <>
              {filteredProducts.map((pro) => (
                <ProductCard
                  key={pro.id}
                  image={pro.image}
                  category={pro.category}
                  name={pro.name}
                  price={pro.price}
                  id={pro.id}
                />
              ))}
            </>
          ) : (
            <span className="text-4xl font-semibold text-center mt-10 mb-96">
              no Product available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
