"use client";
import { fetchUser } from "@/store/reducer/userFetchReducer";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../../../public/assets/Images/User.png";
import Loader from "@/(components)/Loader/Loader";

export default function Account() {
  const dispatch = useDispatch();

  const { userData, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);


  return (
    <div>
      <div className="bg-[#f1f2f4] flex flex-row justify-center items-center p-7">
        <div className="h-1 w-44 bg-black max-[630px]:hidden" />
        <h1 className="text-5xl font-semibold font-greyQe mx-4 max-[730px]:text-3xl">
          My Account
        </h1>
        <div className="h-1 w-44 bg-black max-[630px]:hidden" />
      </div>
      {isLoading ? (
        <div className="h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-center my-28 max-w-[800px]:my-10">
            <div className="flex flex-row max-[800px]:flex-col w-[1000px] justify-around shadow-lg rounded-lg p-10 max-[400px]:p-0">
              <div className="flex justify-center flex-col items-center text-center">
                <div className="border-1 w-fit rounded-full shadow-lg">
                  <Image src={profile} alt="User" width={200} height={200} />
                </div>
                <div>
                  <h1 className="my-8">{userData?.userName}</h1>
                  <h1>{userData?.email}</h1>
                </div>
              </div>
              <div className="w-1/2 max-[800px]:w-full">
                <div className="flex justify-between flex-row max-[448px]:flex-col bg-[#f1f2f4] rounded-lg p-6 mb-3">
                  <span className="font-bold font-greyQe">Name </span>{" "}
                  <span>{userData?.userName}</span>
                </div>
                <div className="flex justify-between flex-row bg-[#f1f2f4] max-[448px]:flex-col rounded-lg p-6 mb-3">
                  <span className="font-bold font-greyQe">Email </span>
                  <span>{userData?.email}</span>
                </div>
                <div className="flex justify-between flex-row bg-[#f1f2f4] rounded-lg p-6 mb-3 max-[448px]:flex-col">
                  <span className="font-bold font-greyQe">Status </span>{" "}
                  <span>{userData?.status}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
