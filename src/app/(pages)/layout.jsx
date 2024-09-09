"use client";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
const DetailFooter = dynamic(
  () => import("../../(components)/DetailFooter/DetailFooter"),
  { ssr: false }
);
const Footer = dynamic(() => import("../../(components)/Footer/Footer"), {
  ssr: false,
});
const Header = dynamic(() => import("../../(components)/Header/Header"), {
  ssr: false,
});

import { useEffect } from "react";
import { fetchUser } from "@/store/reducer/userFetchReducer";
export default function RootLayout({ children }) {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div>
      <Header />
      {children}
      <DetailFooter />
      <Footer />
    </div>
  );
}
