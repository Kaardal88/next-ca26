import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { cart } = useCart();

  return (
    <div
      className="absolute -top-4 -right-3 flex items-center justify-center
                min-w-[20px] h-5 px-1 text-xs font-bold
                text-white bg-red-500 rounded-full"
    >
      {cart.length}
    </div>
  );
}
