import { ProductDetail } from "@/components/ProductDetail";
import { NavBar } from "@/components/NavBar";
import { ToastProvider } from "@/components/ToastProvider";
import { Footer } from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <NavBar />
      <main className="flex min-h-screen  flex-col  w-full  bg-black font-sans relative ">
        <ProductDetail id={id} />
        <ToastProvider />
      </main>
      <Footer />
    </>
  );
}
