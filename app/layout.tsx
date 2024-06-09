import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { NextUIProvider } from "@nextui-org/react";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import StoreProvider from "./_redux/store-provider";
import dynamic from "next/dynamic";
import NavbarFooter from "./_components/NavbarFooter/NavbarFooter";
import { ToastContainer } from "react-toastify";
const Authentication = dynamic(
  () => import("./_components/Authentication/Authentication"),
  { ssr: false }
);

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahabat Nabawi",
  description: "Mudahkan Haji & Umrah bersama Sahabat Nabawi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <NextUIProvider>
          <StoreProvider>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <main className="max-w-md mx-auto shadow-lg">
              <Header />
              {children}
              <NavbarFooter />
              <Footer />
              <Authentication />
            </main>
          </StoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
