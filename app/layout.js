import "./globals.css";
import ContextProvider from "@/app/lib/ContextProvider";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import Popup from "@/app/ui/Popup";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Members portal",
  description: "EIK members portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className+' lg:text-sm 2xl:text-base'}>
        <ContextProvider>
          <Suspense>
            {children}
            <Popup />
          </Suspense>
        </ContextProvider>
      </body>
    </html>
  );
}
