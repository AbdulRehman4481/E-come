import React, { useState } from "react";
import { Pagination, PaginationItemType } from "@nextui-org/react";
import { FaAngleRight } from "react-icons/fa";
import cn from "classnames";
import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/product.json";

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  

  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderProducts = () =>
    selectedProducts.map((product) => (
      <div className="flex justify-center" key={product.id}>
        <div className="  py-2 overflow-hidden transition-shadow duration-300">
          <ProductCard image={product.image} category={product.category} name={product.name }price={product.price} />
        </div>
      </div>
    ));

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
          )}
          onClick={onNext}
        >
          <FaAngleRight />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
          )}
          onClick={onPrevious}
        >
          <FaAngleRight className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive &&
            "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="flex flex-col items-center gap-5 my-5">
        <div className="h-[2px] w-60 bg-black" />
        <h1 className="text-2xl md:text-3xl font-semibold">Product List</h1>
        <div className="h-[2px] w-60 bg-black" />
      </div>
      <div className="flex justify-center">
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {renderProducts()}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          disableCursorAnimation
          showControls
          total={Math.ceil(products.length / itemsPerPage)}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
          className="gap-2"
          radius="full"
          renderItem={renderItem}
          variant="light"
        />
      </div>
    </div>
  );
}
