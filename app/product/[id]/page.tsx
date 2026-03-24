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
      <div className="flex min-h-screen items-center flex-col justify-center  font-sans bg-black">
        <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start">
          <ProductDetail id={id} />
          <ToastProvider />
        </main>
      </div>
      <Footer />
    </>
  );
}
