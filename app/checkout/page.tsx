"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    toast.success("Order sent! Thank you for your purchase.");
    clearCart();
    router.push("/");
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex justify-between">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-lg font-semibold">Total: {totalPrice}</p>

        <button
          onClick={() => {
            handleOrder();
            toast.success("Order sent! Thank you for your purchase.");
          }}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Send Order
        </button>
      </div>
    </div>
  );
}
