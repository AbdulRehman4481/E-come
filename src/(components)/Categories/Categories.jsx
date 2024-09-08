"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Categories({ handleCategoryChange }) {
  const [category, setCategory] = useState();
  const router = useRouter();

  const categoriesList = [
    { category: "Laptop" },
    { category: "Computer" },
    { category: "Ram" },
    { category: "Laptop Speakers" },
    { category: "Hard Drives" },
    { category: "Batteries" },
    { category: "Chargers" },
    { category: "Keyboards" },
  ];

  const handleClick = (selectedCategory) => {
    setCategory(selectedCategory);
    if (handleCategoryChange) {
      handleCategoryChange(selectedCategory);
      return;
    }
    router.push(`/products?category=${selectedCategory}`);
  };

  return (
    <div className="px-4 py-2 relative">
      <div className="flex justify-center">
        <ul className="flex flex-wrap gap-3 sm:gap-5 rounded-lg justify-center">
          {categoriesList.map((cat, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  handleClick(cat.category);
                }}
                className={`text-sm sm:text-base md:text-lg text-[#898e92] hover:text-red-600
                  ${
                    category === cat.category
                      ? "text-red-600"
                      : "text-[#898e92]"
                  }
                  font-medium cursor-pointer rounded-md p-2`}
              >
                {cat.category}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
