"use client";
import { auth, firestore } from "@/config/firebase";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiHeart, BiSearch, BiUser } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { IoReorderThree } from "react-icons/io5";
import { showToast } from "../toast/Toast";
import { IoIosLogOut } from "react-icons/io";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [cartProduct, setCartProduct] = useState([]);

  const router = useRouter();
  const userData = auth.currentUser;
  useEffect(() => {
    const getCart = async () => {
      if (userData && userData.uid) {
        const q = query(
          collection(firestore, "carts"),
          where("userId", "==", userData.uid)
        );
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // console.log("data", data);
            setCartProduct(data.products);
          });
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    getCart();
  }, [userData]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      showToast("Logout", "success");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleNavigation = (path) => {
    if (userData) {
      router.push(path);
    } else {
      router.push("/auth/login");
      showToast("Please log in to continue", "warning");
    }
  };
  // console.log("cartProduct", cartProduct);
  return (
    <>
      <Navbar className="my-6">
        <NavbarBrand>
          <a href="/" className="font-bold text-4xl text-red-600">
            E-Come
          </a>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarItem className="relative group">
            <div className="border-1 flex flex-row justify-center rounded-[100px] p-4">
              <input
                type="text"
                className="outline-none w-96 bg-transparent"
                placeholder="I'm shopping for...."
              />
              <button>
                <BiSearch size={33} />
              </button>
            </div>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden md:flex">
          <NavbarItem>
            <button
              className="relative"
              onClick={() => handleNavigation("/cart")}
            >
              <BsCart4 size={32} className="cursor-pointer" />
              <span className="bg-red-600 text-xs text-white py-1 px-2 rounded-full absolute top-0">
                {cartProduct.length}
              </span>
            </button>
          </NavbarItem>
          <NavbarItem>
            <BiHeart
              size={32}
              className="cursor-pointer"
              onClick={() => handleNavigation("/wishlist")}
            />
          </NavbarItem>
          <NavbarItem>
            <IoIosLogOut
              size={32}
              className="cursor-pointer"
              onClick={handleLogout}
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="md:hidden flex">
          <NavbarItem>
            <button
              onClick={toggleSidebar}
              className="bg-primary rounded-lg px-1 hover:bg-secondary transition-all duration-300"
            >
              <IoReorderThree color="white" size={45} />
            </button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
