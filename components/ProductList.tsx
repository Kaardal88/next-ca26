import Image from "next/image";
import Link from "next/link";
import styles from "@/css/loader.module.css";
import { toast } from "react-toastify";
import { SearchBar } from "@/components/SearchBar";
import { SortPrice } from "@/components/SortPrice";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useProducts } from "@/context/ProductContext";

const productsPerPage = 8;
export function ProductList() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOrder, setSortOrder] = useState("default");

  if (loading) {
    return <span className={styles.loader}></span>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const visibleProducts = sortedProducts.slice(
    0,
    currentPage * productsPerPage,
  );

  return (
    <div className="mt-8">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortPrice setSortOrder={setSortOrder} />

      <h3 className="text-xl font-bold mb-4">Online Shop</h3>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-5xl gap-6 mt-8">
        {visibleProducts.map((product) => (
          <li
            key={product.id}
            className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition hover:scale-105 "
          >
            <Link href={`/product/${product.id}`} className="no-underline">
              <Image
                src={product.image.url}
                alt={product.image.alt}
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            </Link>

            <span className="text-lg">Price: ${product.price}</span>
            <span className="text-sm text-gray-500 ml-2">
              ({product.discountedPrice} off)
            </span>

            <br />
            <br />

            <span className="text-sm">Rating: {product.rating}</span>

            <div className="mt-2">
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart`);
                }}
                className="text-white bg-orange-500/50 hover:bg-orange-600 py-2 px-4 rounded mt-4 cursor-pointer shadow "
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="text-white bg-orange-500/50 hover:bg-orange-600 py-2 px-4 rounded mt-6"
      >
        Load More
      </button>
    </div>
  );
}
