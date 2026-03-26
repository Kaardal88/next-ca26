"use client";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ProductList } from "@/components/ProductList";
import { ToastProvider } from "@/components/ToastProvider";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen  flex-col  w-full  bg-black font-sans relative">
        <main
          className="grid grid-cols-1 lg:grid-cols-2 gap-10
                 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 bg-black"
        >
          <ProductList />
          <ToastProvider />
        </main>
      </div>
      <Footer />
    </>
  );
}
