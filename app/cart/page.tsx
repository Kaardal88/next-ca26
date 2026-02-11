"use client";

import { useCart } from "@/context/CartContext";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function CartPage() {
  // Vi henter data og funksjoner fra "ryggsekken" vår
  const { cart, removeFromCart, clearCart } = useCart();

  // Enkel logikk for å regne ut totalt antall (siden vi ikke har pris ennå)
  const totalItems = cart.length;

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black font-sans">
      <NavBar />

      <main className="flex w-full max-w-3xl flex-col p-8 mt-24 bg-white dark:bg-zinc-900 shadow-md rounded-lg">
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
                <li
                  key={`${item.id}-${index}`}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-500">
                        Product: {item.title}
                        <br></br>
                        Price: {item.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:bg-red-50 px-2 py-1 rounded"
                  >
                    Fjern
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t pt-6">
              <p className="text-lg font-semibold">
                Totalt antall varer: {totalItems}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Tøm kurv
                </button>

                <button
                  onClick={() =>
                    alert("Takk for handelen! (Dette er neste steg)")
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
                >
                  Gå til kassen
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
