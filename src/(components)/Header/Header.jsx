"use client";
import { auth, firestore } from "../../config/firebase";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { IoReorderThree } from "react-icons/io5";
import { showToast } from "../toast/Toast";
import { LuUser2 } from "react-icons/lu";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [cartProduct, setCartProduct] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown toggle

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
          onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              setCartProduct(data.products);
            });
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

  return (
    <div className="relative">
      <Navbar className="my-6 ">
        <NavbarBrand>
          <a href="/" className="font-bold text-4xl font-greyQe text-red-600">
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
          {userData ? (
            <>
              <NavbarItem>
                <a href="/cart" className="relative">
                  <BsCart4 size={32} className="cursor-pointer" />
                  <span className="bg-red-600 text-xs text-white py-1 px-2 rounded-full absolute top-0 right-0">
                    {cartProduct.length}
                  </span>
                </a>
              </NavbarItem>
              <NavbarItem>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="relative"
                  >
                    <LuUser2 size={32} className="cursor-pointer" />
                  </button>
                  {dropdownOpen && (
                    <div
                      className={`absolute right-0 top-10 bg-white border shadow-2xl rounded-xl p-4 w-48 transition-all duration-300 transform ${
                        dropdownOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    >
                      <ul className="list-none">
                        <li  className="py-2 px-2 rounded-md hover:bg-[#f1f2f4] cursor-pointer hover:text-red-600">
                          <a href="/account">My Account</a>
                        </li>
                        <li
                          className="py-2 hover:bg-[#f1f2f4] px-2 rounded-md cursor-pointer hover:text-red-600"
                          onClick={handleLogout}
                        >
                          Log Out
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </NavbarItem>
            </>
          ) : (
            <a href="/auth/login">
              <Button color="primary" variant="shadow">
                Login
              </Button>
            </a>
          )}
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
    </div>
  );
}
