import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaRegClock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosCall, IoIosMail } from "react-icons/io";
export default function DetailFooter() {
  return (
    <div className="flex justify-center my-4 max-[600px]:mx-10">
      <div className="w-[1200px]">
        <div className="flex max-[950px]:flex-col  justify-around ">
          <div className="flex justify-between max-[415px]:flex-col">
          <div className="w-">
            <h1 className="text-red-600 text-3xl font-greyQe mb-4">E-comme</h1>
            <div className="flex w-[300px] items-center gap-5  mb-3 ">
              <h1>
                <CiLocationOn size={30} color="#666666" />
              </h1>
              <h1 className="text-sm text-[#666666]">
                45 Grand Central Terminal New York,NY 1017 United State USA
              </h1>
            </div>
            <div className="flex w-[300px] items-center gap-5  mb-3">
              <h1>
                <IoIosCall size={30} color="#666666" />
              </h1>
              <h1 className="text-sm text-[#666666]">
                +923167106594 +923167106594
              </h1>
            </div>
            <div className="flex w-[300px] items-center gap-5  mb-3">
              <h1>
                <IoIosMail size={30} color="#666666" />
              </h1>
              <h1 className="text-sm text-[#666666]">
                Contact@yourcompany.com
              </h1>
            </div>
            <div className="flex w-[300px] items-center gap-5  mb-3">
              <h1>
                <FaRegClock size={30} color="#666666" />
              </h1>
              <h1 className="text-sm text-[#666666]">
                Mon-Sat 9:00pm - 5:00pm Sun : Closed
              </h1>
            </div>
            <div className="mt-4">
              <h1 className="text-xl my-4 font-semibold">Follow Us</h1>
              <div className="flex gap-5">
                <div className="border-1 rounded-full border-[#666666] hover:border-white w-10 p-2 hover:bg-primary-gradient hover:text-white cursor-pointer text-[#666666] h-10">
                  <FaFacebookF size={25} />
                </div>
                <div className="border-1 rounded-full border-[#666666] hover:border-white w-10 p-2 hover:bg-primary-gradient hover:text-white cursor-pointer text-[#666666] h-10">
                  <FaInstagram size={25} />
                </div>
                <div className="border-1 rounded-full border-[#666666] hover:border-white w-10 p-2 hover:bg-primary-gradient hover:text-white cursor-pointer text-[#666666] h-10">
                  <FaXTwitter size={25} />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-lg font-semibold  mb-3">
              <u>Pages</u>
            </h1>
            <h1 className="text-sm text-[#666666] mb-3">My Account</h1>
            <h1 className="text-sm text-[#666666] mb-3">Cart</h1>
            <h1 className="text-sm text-[#666666] mb-3">Wish List</h1>
            <h1 className="text-sm text-[#666666] mb-3">Contact</h1>
          </div>
          </div>
          <div className="flex  justify-between gap-32 max-[415px]:gap-10 max-[415px]:flex-col">
          <div className="">
            <h1 className="text-lg font-semibold  mb-3">
              <u>Quick Menu</u>
            </h1>
            <h1 className="text-sm text-[#666666] mb-3">Computer</h1>
            <h1 className="text-sm text-[#666666] mb-3">Laptops</h1>
            <h1 className="text-sm text-[#666666] mb-3">Smart Phones</h1>
            <h1 className="text-sm text-[#666666] mb-3">Camera</h1>
            <h1 className="text-sm text-[#666666] mb-3">Head Phone</h1>
          </div>
          <div className="">
            <h1 className="text-lg font-semibold  mb-3">
              <u>Help Center</u>
            </h1>
            <h1 className="text-sm text-[#666666] mb-3">Call us Any Time</h1>
            <h1 className="text-sm text-[#666666] mb-3">
              +92316716594 - +92316716594{" "}
            </h1>
            <h1 className="text-sm text-[#666666] mb-3">Subscription</h1>
            <h1 className="text-sm text-[#666666] mb-3">
              Register now to get updates on promotions and coupons.
            </h1>
            <div className="rounded-md border-1 flex  border-[#6666] mb-3 ">
              <input
                placeholder="Enter Your Email to Subscribe "
                className="border-none text-[#666666] text-small p-2 outline-none w-full"
              />
              <button className="bg-gradient-to-r from-[#c26af5] to-[#54f0ff] p-2 rounded-r-md text-white">
                Subscribe
              </button>
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}
