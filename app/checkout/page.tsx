"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "@/css/receipt.module.css";
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import loader from "@/css/loader.module.css";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
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

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      toast.success("Order sent successfully!");

      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const handleOrder = () => {
    setLoading(true);
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center  bg-black font-sans ">
        <NavBar />
        <p className="text-1xl font-bold mb-6 text-center mt-20">
          Your cart is empty...
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2  text-white rounded bg-blue-500 transition-colors  cursor-pointer shadow hover:scale-105"
        >
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center  bg-black font-sans">
      <NavBar />

      <main className="flex w-full max-w-2xl flex-col p-8 mt-24  shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        <div className="text-center text-2xl font-semibold mb-6 text-white">
          {submitted && <p>Thank you for your order!</p>}
        </div>

        <div
          className={styles.receipt}
          style={{
            marginTop: "5rem",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            src={logo}
            alt="Receipt"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold mb-6 text-black">Receipt</h1>

          <p className="text-black italic mb-4">
            Order date: {new Date().toLocaleString()}
          </p>

          <ul className="divide-y text-black">
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
            <span className="overline text-lg font-semibold flex justify-end text-black  mb-6 ">
              <p className=" text-lg font-semibold flex justify-end text-black py-4">
                Total: {formattedTotalPrice}
              </p>
            </span>

            <button
              type="submit"
              onClick={() => {
                handleOrder();
                toast.success("Order sent! Thank you for your purchase.");
              }}
              disabled={loading}
              className="mt-4 w-full px-4 py-2 text-white rounded bg-green-600 hover:bg-green-500 transition-colors cursor-pointer shadow hover:scale-105 disabled:opacity-50  disabled:cursor-not-allowed  "
            >
              {loading ? <span className={loader.loader}></span> : "Send Order"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
