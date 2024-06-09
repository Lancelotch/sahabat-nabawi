import type { Metadata } from "next";

import Hero from "./_components/Hero/Hero";

export const metadata: Metadata = {
  title: "Sahabat Nabawi - Homepage",
  description: "Mudahkan Haji & Umrah bersama Sahabat Nabawi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero />
      {children}
    </>
  );
}
