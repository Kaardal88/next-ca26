import { ProductDetail } from "@/components/ProductDetail";
import { NavBar } from "@/components/NavBar";
import { ToastProvider } from "@/components/ToastProvider";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center flex-col justify-center bg-zinc-50 font-sans dark:bg-black">
      <NavBar />
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ProductDetail id={id} />
        <ToastProvider />
      </main>
    </div>
  );
}
