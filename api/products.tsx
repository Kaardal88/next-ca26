"use client";

import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const url = "https://v2.api.noroff.dev/online-shop";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const productList = await response.json();
  return productList.data ?? [];
}

/*  const fetchProducts = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const data = await response.json();
        setProducts(data.data);
      } catch (err: any) {
        console.log(err);
        setError(`Failed to fetch products: ${err.status}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); */
