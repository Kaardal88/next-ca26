"use client";
import { NavBar } from "@/components/NavBar";
import { FetchProducts } from "@/api/FetchProducts";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center bg-zinc-50 font-sans dark:bg-black">
      <NavBar />
      <main className="flex min-h-screen max-w-8xl flex-col items-center justify-between   py-32 px-16 bg-white dark:bg-black sm:items-start">
        <FetchProducts />
      </main>
    </div>
  );
}
