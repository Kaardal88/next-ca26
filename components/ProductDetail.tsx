"use client";

import { Product } from "@/types/game";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

import Image from "next/image";

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

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Image
        src={product.image.url}
        alt={product.image.alt}
        width={500}
        height={500}
        className="rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
        <p className="text-white mb-6">{product.description}</p>
        <span className="text-2xl font-bold">{product.price},-</span>
        <p className="text-gray-600 mt-4">{product.tags}</p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>

          {product.reviews && product.reviews && product.reviews.length > 0 ? (
            <ul className="divide-y">
              {product.reviews.map((review) => (
                <li key={review.id} className="py-4">
                  <h3 className="font-semibold">{review.username}</h3>
                  <p className="text-sm text-gray-400">
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

        <button
          onClick={() => {
            toast.success("Successfully added to cart!");
            addToCart(product);
          }}
          className="relative z-50 text-white bg-orange-500 py-2 px-4 rounded mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
