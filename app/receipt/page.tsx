"use client";

import { useCart } from "@/context/CartContext";

import styles from "@/css/receipt.module.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import loader from "@/css/loader.module.css";
import { useRouter } from "next/navigation";

export default function ReceiptPage() {
  const { order } = useCart();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const totalPrice = order.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  const handleExit = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col items-center  bg-black font-sans">
        <main className="flex w-full max-w-2xl flex-col p-8 mt-8  shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Thank you for your order!
          </h1>
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
              {order.map((item) => {
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
                  handleExit();
                }}
                disabled={loading}
                className="mt-4 w-full px-4 py-2 text-white rounded bg-green-600 hover:bg-green-500 transition-colors cursor-pointer shadow hover:scale-105 disabled:opacity-50  disabled:cursor-not-allowed  "
              >
                {loading ? <span className={loader.loader}></span> : "Exit"}
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
