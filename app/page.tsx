"use client";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ProductList } from "@/components/ProductList";
import { ToastProvider } from "@/components/ToastProvider";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen  flex-col    bg-black font-sans ">
        <main
          className="
                max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-20 bg-black"
        >
          <ProductList />
          <ToastProvider />
        </main>
      </div>
      <Footer />
    </>
  );
}
