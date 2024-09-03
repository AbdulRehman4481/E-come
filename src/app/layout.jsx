import { Providers } from "@/store/Provider";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"]
});
export const metadata = {
  title: "E-Come",
};

const RootLayout = ({ children }) => {
  
  return (
    <html>
      <body className={inter.className}>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
