"use client";

import { useCart } from "@/context/CartContext";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const formattedTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  const { increaseQuantity } = useCart();
  const { decreaseQuantity } = useCart();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black font-sans">
      <NavBar />

      <main className="flex w-full max-w-3xl flex-col p-8 mt-24 bg-white/10 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Cart is empty...</p>
            <Link href="/" className="text-blue-500 hover:underline">
              Back to shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={`${item.id}-${index}`} className="py-4 flex  ">
                  <div className="flex relative items-center w-full justify-between gap-4">
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex justify-between  items-start w-full">
                      <p className="text-sm text-white">
                        Product: {item.title}
                        <br></br>
                        Price: {item.price}
                      </p>
                      <div className="flex  items-center mt-2  w-24">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="mr-2 text-lg font-bold hover:bg-red-700 rounded px-2 py-1 hover:cursor-pointer"
                        >
                          -
                        </button>
                        <span className=" bg-gray-50 text-black rounded py-1 px-4 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="ml-2 text-lg font-bold hover:bg-green-700 rounded px-2 py-1 hover:cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white border border-red-500 text-sm hover:bg-red-700 px-2 py-1 ml-4 rounded hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-6 ">
              <p className="text-lg font-semibold">Items total: {totalItems}</p>
              <p className="text-lg font-semibold">
                Total price: {formattedTotalPrice}
              </p>

              <div className="flex gap-4 mt-6 justify-between ">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-red-700 hover:text-white hover:cursor-pointer"
                >
                  Empty cart
                </button>
                <Link
                  href="/checkout"
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-green-700 hover:text-white hover:cursor-pointer"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
