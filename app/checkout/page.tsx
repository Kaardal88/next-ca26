"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

import loader from "@/css/loader.module.css";

export default function CheckoutPage() {
  const { cart, clearCart, setOrder } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  const handleOrder = () => {
    setLoading(true);
    setOrder(cart);
    clearCart();
    toast.success("Order placed successfully!");
    setTimeout(() => {
      router.push("/receipt");
    }, 1500);
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col items-center  bg-black font-sans">
        <main className="flex w-full max-w-2xl flex-col p-8 mt-24  shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6 sm:text-center lg:text-left text-white">
            Checkout
          </h1>

          <section className="mb-6 bg-gray-800 rounded-lg p-6">
            <h2 className="text-1xl font-bold mb-4 text-white flex justify-center bg-gray-700 rounded-lg p-2">
              Order Summary
            </h2>

            <ul className="divide-y text-white">
              {cart.map((item) => {
                const itemTotal = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price * item.quantity);
                return (
                  <li key={item.id} className="py-4 flex justify-between">
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span>{itemTotal}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <span className="overline text-lg text-white font-semibold flex justify-end   mb-6 ">
                <p className=" text-lg font-semibold flex justify-end text-white py-4">
                  Total: {formattedTotalPrice}
                </p>
              </span>

              <button
                type="submit"
                onClick={() => {
                  handleOrder();
                }}
                disabled={loading}
                className="mt-4 w-full px-4 py-2 text-white rounded bg-green-600 hover:bg-green-500 transition-colors cursor-pointer shadow hover:scale-105 disabled:opacity-50  disabled:cursor-not-allowed  "
              >
                {loading ? (
                  <span className={loader.loader}></span>
                ) : (
                  "Send Order"
                )}
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
