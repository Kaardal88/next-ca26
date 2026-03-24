import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { cart } = useCart();

  return (
    <div
      className="absolute -top-2 -right-0 flex items-center justify-center
             text-white bg-red-500 rounded-full font-bold
             w-4 h-4 text-xs
             sm:w-4 sm:h-4 sm:text-sm
             lg:w-5 lg:h-5 lg:text-base"
    >
      {cart.length}
    </div>
  );
}
