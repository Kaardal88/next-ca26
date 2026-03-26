import Image from "next/image";
import Link from "next/link";
import styles from "@/css/loader.module.css";
import { toast } from "react-toastify";
import { SearchBar } from "@/components/SearchBar";
import { SortPrice } from "@/components/SortPrice";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { starRating } from "./starRating";

const productsPerPage = 16;
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
    <div className="mt-8 mb-8 bg-black">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortPrice setSortOrder={setSortOrder} />

      <h3 className="text-xl font-bold mb-4 mt-4 text-white">Online Shop</h3>

      <ul className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 lg:w-5xl gap-6 mt-8">
        {visibleProducts.map((product) => {
          const discountedPercentage =
            (product.discountedPrice / product.price) * 100;

          return (
            <li
              key={product.id}
              className="text-white bg-gray-800 hover:bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition hover:scale-105 "
            >
              <Link href={`/product/${product.id}`} className="no-underline">
                <div className="">
                  <div className="relative ">
                    {discountedPercentage < 100 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded">
                        {Math.trunc(discountedPercentage)}%
                      </div>
                    )}
                    <Image
                      src={product.image.url}
                      alt={product.image.alt}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover mb-4 rounded "
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </Link>

              {product.discountedPrice < product.price ? (
                <>
                  <span className="text-lg">
                    Price: ${product.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-500 ml-2 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg">Price: ${product.price}</span>
              )}

              <br />
              <br />
              <div className="flex items-center">
                {starRating(product.rating || 0)}
                <span className="text-sm text-gray-500 ml-2">
                  {" "}
                  {product.rating}/5
                </span>
              </div>

              <div className="mt-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.title} added to cart`);
                  }}
                  className="text-white bg-orange-500/50 hover:bg-green-700/50 py-2 px-4 rounded mt-4 cursor-pointer shadow "
                >
                  Add to Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="text-white bg-orange-500/50 hover:bg-orange-600 py-2 px-4 rounded mt-6 hover:cursor-pointer"
      >
        Load More
      </button>
    </div>
  );
}
