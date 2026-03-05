"use client";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types/game";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import styles from "@/css/loader.module.css";

import { toast } from "react-toastify";

export function FetchProducts() {
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { addToCart } = useCart();
  const hasInitialized = useRef(false);

  useEffect(() => {
    const limit = 8;
    const fetchData = async () => {
      try {
        setLoading(true);

        const url = `https://v2.api.noroff.dev/online-shop?page=${currentPage}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched products:", data.data);

        setProducts((prev) => [...prev, ...data.data]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (!hasInitialized.current) {
      fetchData();
      hasInitialized.current = true;
    }
  }, [currentPage]);

  useEffect(() => {
    const limit = 8;
    const fetchData = async () => {
      try {
        setLoading(true);

        const url = `https://v2.api.noroff.dev/online-shop?page=${currentPage}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched products:", data.data);

        setProducts((prev) => [...prev, ...data.data]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPage > 1) {
      fetchData();
    }
  }, [currentPage]);

  if (loading && products.length === 0) {
    return <span className={styles.loader}></span>;
  }
  if (error) return <div>Error: {error.message}</div>;
  try {
    return (
      <div className="mt-8 ">
        <h3 className="text-xl font-bold mb-4">Online Shop</h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-5xl gap-6 mt-8 ">
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition "
            >
              <Link
                href="/product/[id]"
                as={`/product/${product.id}`}
                className="no-underline"
                scroll={false}
              >
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  width="300"
                  height="300"
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              </Link>
              <span className="text-lg ">Price: ${product.price}</span>
              <span className="text-sm text-gray-500 ml-2">
                ({product.discountedPrice} off)
              </span>
              <br />
              <br />
              <span className="text-sm ">Rating:{product.rating}</span>
              <div className="text-gray-700 mt-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.title} added to cart`);
                  }}
                  className="text-white bg-orange-500/50  hover:bg-orange-600 py-2 px-4 rounded  hover:cursor-pointer mt-4"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-white bg-orange-500/50  hover:bg-orange-600 py-2 px-4 rounded  hover:cursor-pointer mt-4"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    );
  } catch (error) {
    return <div>Error: {(error as Error).message}</div>;
  }
}
