import { auth, firestore } from "../../config/firebase";
import { useDisclosure } from "@nextui-org/react";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";
import Button from "../Button/Button";
import DetailModal from "../DetailModal/DetailModal";
import { showToast } from "../toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/reducer/userFetchReducer";
import { useEffect, useState } from "react";

export default function ProductCard({ image, category, name, price, id }) {
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isDetailOpen,
    onOpen: onOpenDetail,
    onOpenChange: onDetailOpenChange,
  } = useDisclosure();

  const userData = auth.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const getCart = async () => {
      if (userData && userData.uid) {
        const q = query(
          collection(firestore, "carts"),
          where("userId", "==", userData.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const products = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const productsWithQuantities = data.products.map((product) => ({
              ...product,
              quantity: product.quantity || 1,
            }));
            products.push(...productsWithQuantities);
          });

          // Check if the current product is in the cart
          const productInCart = products.some(
            (product) => product.productId === id
          );
          console.log("productInCart", productInCart);
          setIsInCart(productInCart);
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
      }
    };

    getCart();
  }, [userData, id]);

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
        await updateDoc(cartRef, {
          products: [{ productId: id, quantity: 1 }],
        });
      }

      setIsInCart(true);

      showToast("Product added to cart", "success");
    } catch (error) {
      showToast(
        "Something went wrong while adding the product to the cart",
        "error"
      );
      console.error("Error:", error);
    }
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
            className="w-28 h-40 md:w-32 md:h-44 lg:w-36 lg:h-48 object-contain"
          />
        </div>
        <div className="mt-2">
          <span className="font-bold text-sm md:text-base">{category}</span>
          <h1 className="text-lg md:text-xl font-semibold my-2">
            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
          </h1>
          <span className="font-semibold text-sm md:text-base text-[#898e92] mb-2">
            ${price}
          </span>
          <hr className="my-2" />
          <div className="flex justify-between items-center mt-2">
            {isInCart ? (
              <a  href="/cart" className="text-green-600 font-semibold">
                Added to Cart
              </a>
            ) : (
              <button onClick={handleAddCart} className="cursor-pointer">
                <BiCartAdd size={40} />
              </button>
            )}
            <Button text={"Preview"} size={"base"} click={handleDetailView} />
          </div>
        </div>
      </div>

      <DetailModal
        isOpen={isDetailOpen}
        onOpen={onOpenDetail}
        onOpenChange={onDetailOpenChange}
        detailId={id}
      />
    </>
  );
}
