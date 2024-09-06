import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import DetailModal from "../DetailModal/DetailModal";

export default function ProductBar({ sortedProducts, heading }) {
  const {
    isOpen: isDetailOpen,
    onOpen: onOpenDetail,
    onOpenChange: onDetailOpenChange,
  } = useDisclosure();
  const [productId, setProductId] = useState("");

  const handleProductClick = (product) => {
    setProductId(product.id);
    onOpenDetail();
  };
  return (
    <>
      <div className="w-full sm:w-auto">
        <ul className="border rounded-lg bg-white">
          <li className="font-semibold text-lg sm:text-xl p-4">{heading}</li>
          {sortedProducts?.slice(0, 5).map((product) => (
            <React.Fragment key={product.id}>
              <li
                className="flex max-[1260px]:flex-col max-[1100px]:flex-row p-4 items-center cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="">
                  <Image
                    src={product.image}
                    className="w-16 h-20 object-contain"
                    alt={product.name}
                    width={64}
                    height={80}
                  />
                </div>
                <div className="ml-4">
                  <h1 className="font-semibold text-sm sm:text-base">
                    {product.name}
                  </h1>
                  <h1 className="font-semibold text-[#898e92] mt-2 text-sm sm:text-base">
                    ${product.price}{" "}
                    <span className="text-[10px] text-red-600">{product.discount ?<span> {product.discount}%</span> : ""}</span>
                  </h1>
                </div>
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ul>
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
