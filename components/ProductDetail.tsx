"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import styles from "@/css/loader.module.css";

import Image from "next/image";
import { starRating } from "./starRating";

export function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await fetch(
        `https://v2.api.noroff.dev/online-shop/${id}`,
      );
      const result = await response.json();
      setProduct(result.data);
      setLoading(false);
    };
    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return <span className={styles.loader}></span>;
  }
  if (!product) return <div>Product not found</div>;
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10
                 mx-auto px-4 lg:grid-cols-[1fr_1.3fr]"
    >
      <div className=" rounded-lg shadow-lg">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          width={500}
          height={500}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>

      <div className="p-6  bg-gray-900 text-white rounded-lg shadow-lg ">
        <div className="flex items-center mb-4 flex-col lg:flex-col lg:justify-between">
          <h1 className="text-4xl font-bold mb-4 self-start">
            {product.title}
          </h1>
          <p className="text-white mb-12 self-start">{product.description}</p>

          {product.discountedPrice < product.price ? (
            <>
              <span className="lg:text-4xl sm:text-2xl text-black font-bold bg-amber-400 p-4  rounded-tr-lg rounded-bl-lg self-end">
                Price: ${product.discountedPrice}
                <span className="text-sm font-light text-gray-800 ml-2 line-through self-start">
                  ${product.price}
                </span>
              </span>
            </>
          ) : (
            <span className="lg:text-3xl sm:text-2xl text-black font-bold bg-amber-400 p-4  rounded-tr-lg rounded-bl-lg self-end">
              Price: ${product.price}
            </span>
          )}

          <h3 className="font-semibold mt-8 w-full">Tags:</h3>
          <p className="text-gray-200 mt-4 bg-gray-800 py-2 px-3 rounded self-start">
            {product.tags}
          </p>

          <div className="mt-8  w-full">
            <h2 className="text-2xl font-bold mb-4 divider-gray-800 border-b pb-2">
              Reviews
            </h2>
            <p className="text-gray-400 italic mb-4">Rating:</p>
            <div className="flex items-center mb-8">
              {starRating(product.rating || 0)}
              <span className="text-sm text-gray-500 ml-2">
                {" "}
                {product.rating}/5
              </span>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <ul className="space-y-4">
                {product.reviews.map((review) => (
                  <li
                    key={review.id}
                    className="py-4 bg-gray-800 rounded-lg p-4"
                  >
                    <h3 className="font-semibold">{review.username}</h3>
                    <p className="text-sm text-gray-400 ">
                      Rating: {review.rating}/5
                    </p>
                    <p className="italic">{review.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No reviews yet for this product.</p>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            toast.success("Successfully added to cart!");
            addToCart(product);
          }}
          className="relative  z-50 text-white font-bold bg-green-700 py-2 px-4 rounded mt-12 hover:cursor-pointer hover:bg-green-600 scale-100 hover:scale-105 duration-300 ease-in-out w-full "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
