"use client";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ProductList } from "@/components/ProductList";
import { ToastProvider } from "@/components/ToastProvider";

export default function Home() {
  return (
    <>
      <NavBar />

      <main
        className="
                flex min-h-screen  flex-col  w-full  bg-black font-sans relative"
      >
        <ProductList />
        <ToastProvider />
      </main>

      <Footer />
    </>
  );
}
