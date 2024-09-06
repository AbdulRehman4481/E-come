import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import products from "../../data/product.json";
import { BiCartAdd } from "react-icons/bi";
import Button from "../Button/Button";
import { auth, firestore } from "../../config/firebase";
import { showToast } from "../toast/Toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import CheckoutModal from "../Checkout/CheckoutModal";

export default function DetailModal({ isOpen, onOpenChange, detailId }) {
  const {
    isOpen: checKoutModalOpen,
    onOpen: checKoutModalOnOpen,
    onOpenChange: checKoutModalOnOpenChange,
  } = useDisclosure();
  const productData = [{ productId: detailId, quantity: 1 }];
  const filteredProduct = products.filter((pro) => pro.id === detailId);

  const productTO = filteredProduct[0];
  const productPrice = filteredProduct?.price || 0;
  const userData = auth.currentUser;
  const handleAddCart = async () => {
    if (!userData) {
      showToast("Please log in first to add products to your cart", "info");
      return;
    }
    try {
      const cartRef = doc(firestore, "carts", userData.uid);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        const productIndex = cartData.products.findIndex(
          (product) => product.productId === detailId
        );

        if (productIndex !== -1) {
          const updatedProducts = cartData.products.map((product, index) =>
            index === productIndex
              ? { ...product, quantity: product.quantity + 1 }
              : product
          );

          await updateDoc(cartRef, {
            products: updatedProducts,
          });
        } else {
          await updateDoc(cartRef, {
            products: [
              ...cartData.products,
              { productId: detailId, quantity: 1 },
            ],
          });
        }
      }

      showToast("Product added to cart", "success");
    } catch (error) {
      showToast(
        "Something went wrong while adding the product to the cart",
        "error"
      );
      console.error("Error:", error);
    }
  };

  const handleBuy = () => {
    if (!userData) {
      showToast("Please log in first to buy products", "info");
      return;
    }
    checKoutModalOnOpen();
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-xl font-semibold">
                Product Detail
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center gap-6">
                  <div>
                    <Image
                      src={productTO.image}
                      width={400}
                      height={400}
                      alt="dskjfh"
                    />
                    <div className="flex flex-row gap-5 justify-center items-center">
                      <Image
                        src={productTO.image}
                        width={80}
                        height={80}
                        alt="dskjfh"
                      />
                      <Image
                        src={productTO.image}
                        width={80}
                        height={80}
                        alt="dskjfh"
                      />
                      <Image
                        src={productTO.image}
                        width={80}
                        height={80}
                        alt="dskjfh"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-10">
                    <h1 className="text-5xl font-bold">{productTO.name}</h1>
                    <h1 className="text-xl text-[#909194] font-semibold">
                      Category:
                      <span className="text-3xl font-semibold text-black mx-2">
                        {productTO.category}
                      </span>
                    </h1>
                    <div className="flex justify-center items-center w-fit flex-col">
                      <div className="h-1 w-full bg-red-700" />{" "}
                      <h1 className="text-3xl font-semibold text-red-700">
                        ${productTO.price}{" "}
                        <div className="h-1 w-full bg-red-700" />
                      </h1>
                    </div>
                    <p className="max-w-96">
                      {productTO && productTO.fullDescription.length > 200
                        ? productTO.fullDescription?.slice(0, 200)
                        : productTO.fullDescription}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={handleAddCart}
                        className="cursor-pointer"
                      >
                        <BiCartAdd size={40} />
                      </button>
                      <Button
                        text={"Buy Now"}
                        size={"base"}
                        click={handleBuy}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <CheckoutModal
        isOpen={checKoutModalOpen}
        onOpen={checKoutModalOnOpen}
        onOpenChange={checKoutModalOnOpenChange}
        productIdsAndQuantities={productData}
        totalAmount={productPrice}
      />
    </>
  );
}
