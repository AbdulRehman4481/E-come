import { fetchUser } from "@/store/reducer/userFetchReducer";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bankLogo from "../../../public/assets/Images/bank.png";
import cashLogo from "../../../public/assets/Images/cash.png";
import easyLogo from "../../../public/assets/Images/easy.png";
import jazzLogo from "../../../public/assets/Images/jazz.png";
import { firestore, storage } from "../../config/firebase";
import { showToast } from "../toast/Toast";

export default function CheckoutModal({
  isOpen,
  onOpenChange,
  productIdsAndQuantities,
  totalAmount,
}) {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  ("productIdsAndQuantities", productIdsAndQuantities);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [file, setFile] = useState(null);

  const [placeOrder, setPlaceOrder] = useState({
    fullName: "",
    city: "",
    address: "",
    email: "",
    phoneNo: "",
  });

  const handleChange = (e) =>
    setPlaceOrder((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handlePaymentChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);

    switch (selectedPaymentMethod) {
      case "Jazz Cash":
        setPaymentNumber("03036668344");
        break;
      case "Easypaisa":
        setPaymentNumber("03167106594");
        break;
      case "Bank Transfer":
        setPaymentNumber("Pk3466546546546");
        break;
      default:
        setPaymentNumber("");
        break;
    }
  };
  const isDigitalPayment = ["Jazz Cash", "Easypaisa", "Bank Transfer"].includes(
    paymentMethod
  );
  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      const fileName = Math.random();
      var fileExtension = file.name.split(".").pop();
      const storageRef = ref(storage, `images/${fileName}.${fileExtension}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject("Error uploading file");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject("Error getting download URL");
            });
        }
      );
    });
  };
  

  const deleteProducts = async () => {
    const cartRef = doc(firestore, "carts", userData.uid);
    try {
      await updateDoc(cartRef, {
        products: [],
      });
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };
  const handleOrder = async (e) => {
    e.preventDefault();
    const cartRef = doc(firestore, "carts", userData.uid);
    try {
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        let fileURL = null;
      if (file) {
        fileURL = await uploadFile();
      }
        const orderData = {
          ...placeOrder,
          file: fileURL, 
          ...productIdsAndQuantities,
          totalAmount,
          paymentMethod,
        };
        const existingOrders = cartData.orders || [];
        const updatedOrders = [...existingOrders, orderData];
        await updateDoc(cartRef, {
          orders: updatedOrders,
        });
        await deleteProducts();
        showToast("Order placed successfully!", "success");
      } else {
        showToast("Cart not found.", "error");
      }
    } catch (error) {
      showToast("Something went wrong while placing the order", "error");
      console.log("error", error);
    }
  };


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1 text-xl font-semibold">
              Checkout
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-1/2">
                  <label className="mb-2 block font-medium" htmlFor="Full Name">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    className="w-full border-2 rounded-lg mb-4 py-2 px-3 focus:outline-none focus:border-primary"
                  />
                  <label className="mb-2 block font-medium" htmlFor="Email">
                    Email:
                  </label>
                  <input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    placeholder="Email"
                    className="w-full border-2 rounded-lg mb-4 py-2 px-3 focus:outline-none focus:border-primary"
                  />
                  <label
                    className="mb-2 block font-medium"
                    htmlFor="Phone Number"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    onChange={handleChange}
                    name="phoneNo"
                    placeholder="Phone Number"
                    className="w-full border-2 rounded-lg mb-4 py-2 px-3 focus:outline-none focus:border-primary"
                  />
                  <label className="mb-2 block font-medium" htmlFor="City">
                    City:
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                    className="w-full border-2 rounded-lg mb-4 py-2 px-3 focus:outline-none focus:border-primary"
                  />
                  <label
                    className="mb-2 block font-medium"
                    htmlFor="Full Address"
                  >
                    Full Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    onChange={handleChange}
                    className="w-full border-2 rounded-lg mb-4 py-2 px-3 focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mt-6 md:mt-0 w-1/2">
                  <h1 className="font-semibold text-lg mb-4">Payment Method</h1>
                  <div className="flex flex-col gap-4 w-full">
                    <div>
                      <label
                        htmlFor="jazzCash"
                        className="text-sm md:text-base font-medium flex justify-between cursor-pointer p-2 rounded-lg bg-[#f1f2f4]"
                      >
                        <div className="flex">
                          <Image
                            src={jazzLogo}
                            alt="Jazz Cash"
                            width={30}
                            height={30}
                            className="rounded-full mx-2 border-1"
                          />
                          <span>Jazz Cash</span>
                        </div>
                        <input
                          type="radio"
                          id="jazzCash"
                          name="paymentMethod"
                          value="Jazz Cash"
                          onChange={handlePaymentChange}
                          checked={paymentMethod === "Jazz Cash"}
                          className="mr-3 focus:ring-primary"
                        />
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="easypaisa"
                        className="text-sm md:text-base font-medium flex justify-between cursor-pointer p-2 rounded-lg bg-[#f1f2f4]"
                      >
                        <div className="flex">
                          <Image
                            src={easyLogo}
                            alt="Easypaisa"
                            width={30}
                            height={30}
                            className="rounded-full mx-2 border-1"
                          />
                          <span>Easypaisa</span>
                        </div>
                        <input
                          type="radio"
                          id="easypaisa"
                          name="paymentMethod"
                          value="Easypaisa"
                          onChange={handlePaymentChange}
                          checked={paymentMethod === "Easypaisa"}
                          className="mr-3 focus:ring-primary"
                        />
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="bankTransfer"
                        className="text-sm md:text-base font-medium flex justify-between cursor-pointer p-2 rounded-lg bg-[#f1f2f4]"
                      >
                        <div className="flex">
                          <Image
                            src={bankLogo}
                            alt="Bank Transfer"
                            width={30}
                            height={30}
                            className="rounded-full mx-2 border-1"
                          />
                          <span>Bank Transfer</span>
                        </div>
                        <input
                          type="radio"
                          id="bankTransfer"
                          name="paymentMethod"
                          value="Bank Transfer"
                          onChange={handlePaymentChange}
                          checked={paymentMethod === "Bank Transfer"}
                          className="mr-3 focus:ring-primary"
                        />
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="cod"
                        className="text-sm md:text-base font-medium flex justify-between cursor-pointer p-2 rounded-lg bg-[#f1f2f4]"
                      >
                        <div className="flex">
                          <Image
                            src={cashLogo}
                            alt="Cash on Delivery"
                            width={30}
                            height={30}
                            className="rounded-full mx-2 border-1"
                          />
                          <span>Cash on Delivery</span>
                        </div>

                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="Cash on Delivery"
                          onChange={handlePaymentChange}
                          checked={paymentMethod === "Cash on Delivery"}
                          className="mr-3 focus:ring-primary"
                        />
                      </label>
                    </div>
                  </div>

                  {isDigitalPayment && (
                    <div className="mt-4">
                      <p>
                        Please send your payment to {paymentNumber}. Share your
                        payment screenshot.
                      </p>
                        <input
                          type="file"
                          placeholder="Upload picture"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                      <div className=" flex  justify-center items-center  mt-2">
                        {file && (
                          <Image
                            src={URL.createObjectURL(file)}
                            width={50}
                            height={50}
                            alt="kasdlkj"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} onClick={handleOrder}>
                Place Order
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

