"use client";
import { NavBar } from "@/components/NavBar";
import { ProductList } from "@/components/ProductList";
import { ToastProvider } from "@/components/ToastProvider";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center font-sans dark:bg-black">
      <NavBar />
      <main className="flex min-h-screen max-w-8xl flex-col items-center justify-between   py-32 px-16 dark:bg-black sm:items-start">
        <ProductList />
        <ToastProvider />
      </main>
    </div>
  );
}
