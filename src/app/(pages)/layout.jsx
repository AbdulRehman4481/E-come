"use client";
import { useDispatch, useSelector } from "react-redux";
import DetailFooter from "../../(components)/DetailFooter/DetailFooter";
import Footer from "../../(components)/Footer/Footer";
import Header from "../../(components)/Header/Header";
import { useEffect } from "react";
import { fetchUser } from "@/store/reducer/userFetchReducer";
export default function RootLayout({ children }) {
  const user = useSelector((state) => state.user.userData);
  console.log(user)
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
