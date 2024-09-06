import { auth, firestore } from "../../config/firebase";
import { useDisclosure } from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import Button from "../Button/Button";
import CheckoutModal from "../Checkout/CheckoutModal";
import DetailModal from "../DetailModaldad/DetailModal";
import { showToast } from "../toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/reducer/userFetchReducer";
import { useEffect } from "react";

export default function ProductCard({ image, category, name, price, id }) {
  const { isOpen: isCheckoutOpen, onOpen: onOpenCheckout, onOpenChange: onCheckoutOpenChange } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onOpenDetail, onOpenChange: onDetailOpenChange } = useDisclosure();
  const productData = [{ productId: id, quantity: 1 }];
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
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
          (product) => product.productId === id
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
            products: [...cartData.products, { productId: id, quantity: 1 }],
          });
        }
      } else {
        // Handle case where cart doesn't exist
        await updateDoc(cartRef, {
          products: [{ productId: id, quantity: 1 }],
        });
      }

      showToast("Product added to cart", "success");
    } catch (error) {
      showToast("Something went wrong while adding the product to the cart", "error");
      console.error("Error:", error);
    }
  };

  const handleBuy = () => {
    if (!userData) {
      showToast("Please log in first to buy products", "info");
      return;
    }
    onOpenCheckout();
  };

  const handleDetailView = () => {
    onOpenDetail();
  };

  return (
    <>
      <div className="w-[250px]  md:w-[300px] lg:w-[300px] xl:max-w-[400px] max-[620px]:w-full p-2 md:p-4 border rounded-lg">
        <div className="flex justify-center items-center">
          <Image
            src={image}
            alt="Product Image"
            width={144}
            height={192}
            className="w-28 h-40 md:w-32 md:h-44 lg:w-36 lg:h-48 object-cover"
          />
        </div>
        <div className="mt-2">
          <span className="font-bold text-sm md:text-base">{category}</span>
          <h1 className="text-lg md:text-xl font-semibold my-2">{name}</h1>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm md:text-base text-[#898e92] mb-2">
              ${price}
            </span>
            <span onClick={handleDetailView} className="cursor-pointer">
              <FaRegEye color="black" size={20} />
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center mt-2">
            <button onClick={handleAddCart} className="cursor-pointer">
              <BiCartAdd size={40} />
            </button>
            <Button text={"Buy Now"} size={"base"} click={handleBuy} />
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onOpen={onOpenCheckout}
        onOpenChange={onCheckoutOpenChange}
        productIdsAndQuantities={productData}
        totalAmount={price}
      />

      <DetailModal
        isOpen={isDetailOpen}
        onOpen={onOpenDetail}
        onOpenChange={onDetailOpenChange}
        detailId={id}
      />
    </>
  );
}
