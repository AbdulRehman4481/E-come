"use client";
import { fetchUser } from "@/store/reducer/userFetchReducer";
import { useDisclosure } from "@nextui-org/react";
import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import CheckoutModal from "../../../(components)/Checkout/CheckoutModal";
import Loader from "../../../(components)/Loader/Loader";
import { firestore } from "../../../config/firebase";
import productData from "../../../data/product.json";
export default function Cart() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    const getCart = async () => {
      setLoading(true); 
      if (userData && userData.uid) {
        const q = query(
          collection(firestore, "carts"),
          where("userId", "==", userData.uid)
        );

        try {
          const querySnapshot = await getDocs(q);
          const products = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const productsWithQuantities = data.products.map((product) => ({
              ...product,
              quantity: product.quantity || 1,
            }));
            products.push(...productsWithQuantities);
          });
          setCartProduct(products);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getCart();
  }, [userData]);

  const handleIncrement = (index) => {
    const updatedCart = [...cartProduct];
    updatedCart[index].quantity += 1;
    setCartProduct(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartProduct];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartProduct(updatedCart);
    }
  };

  const filteredProducts = productData.filter((pro) =>
    cartProduct.some((cartItem) => cartItem.productId === pro.id)
  );

  const totalAmount = filteredProducts.reduce(
    (acc, product, index) => acc + product.price * cartProduct[index].quantity,
    0
  );

  const productIdsAndQuantities = filteredProducts.map((product, index) => ({
    productId: product.id,
    quantity: cartProduct[index].quantity,
  }));

  const handleDeleteProduct = async (productId) => {
    const userCartRef = doc(collection(firestore, "carts"), userData.uid);

    try {
      await runTransaction(firestore, async (transaction) => {
        const cartDoc = await transaction.get(userCartRef);
        const cartData = cartDoc.data();

        if (!cartData || !cartData.products) {
          console.warn("Product not found in cart.");
          return;
        }

        const updatedProducts = cartData.products.filter(
          (product) => product.productId !== productId
        );

        transaction.update(userCartRef, { products: updatedProducts });
      });

      setCartProduct(
        cartProduct.filter((item) => item.productId !== productId)
      );
      console.log("Product successfully deleted from cart.");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center bg-[#f1f2f4] py-3">
          <div className="h-[2px] w-full max-w-sm md:max-w-lg bg-black" />
          <h1 className="text-2xl md:text-4xl font-semibold mx-3">Cart</h1>
          <div className="h-[2px] w-full max-w-sm md:max-w-lg bg-black" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-8 h-[500px]">
            <Loader />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="min-h-screen">
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-4 px-6 text-left">Image</th>
                    <th className="py-4 px-6 text-left">Product Name</th>
                    <th className="py-4 px-6 text-left">Unit Price</th>
                    <th className="py-4 px-6 text-left">Qty</th>
                    <th className="py-4 px-6 text-left">Subtotal</th>
                    <th className="py-4 px-6 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, i) => {
                    const cartItem = cartProduct.find(
                      (item) => item.productId === product.id
                    );
                    const quantity = cartItem?.quantity || 1;
                    const subtotal = product.price * quantity;

                    return (
                      <tr className="border-b" key={i}>
                        <td className="py-4 px-6">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={100}
                            height={150}
                          />
                        </td>
                        <td className="py-4 px-6">{product.name}</td>
                        <td className="py-4 px-6">${product.price}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <button
                              className="border-1 border-black px-2 text-lg"
                              onClick={() => handleDecrement(i)}
                            >
                              -
                            </button>
                            <span className="mx-2">{quantity}</span>
                            <button
                              className="border-1 border-black px-2 text-lg"
                              onClick={() => handleIncrement(i)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6">${subtotal.toFixed(2)}</td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <ImCross size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg">Total Items:</span>
                <span className="text-lg">{cartProduct.length}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg">Subtotal:</span>
                <span className="text-lg">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg">Shipping:</span>
                <span className="text-lg">Free</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={onOpen}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-8 h-[500px]">
            <h2 className="text-2xl font-semibold">No products in cart</h2>
          </div>
        )}
      </div>
      <CheckoutModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        productIdsAndQuantities={productIdsAndQuantities}
        totalAmount={totalAmount}
      />
    </>
  );
}
