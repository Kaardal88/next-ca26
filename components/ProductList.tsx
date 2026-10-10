import Image from "next/image";
import Link from "next/link";
import styles from "@/css/loader.module.css";
import { toast } from "react-toastify";
import { SearchBar } from "@/components/SearchBar";
import { SortPrice } from "@/components/SortPrice";
import { CategoryFilter } from "@/components/CategoryFilter";
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (loading) {
    return <span className={styles.loader}></span>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const categories = Array.from(
    new Set(products.flatMap((product) => product.tags ?? [])),
  ).sort();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" ||
        (product.tags ?? []).includes(selectedCategory)),
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
    <div className="mt-8 mb-24 bg-black flex flex-col w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold mb-4 mt-4 text-white mx-auto">
        Online Shop
      </h3>
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <aside className="w-full lg:w-60 shrink-0 lg:sticky lg:top-24 lg:self-start flex flex-col gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortPrice setSortOrder={setSortOrder} />
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            setSelected={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          />
        </aside>

        <div className="flex-1 min-w-0">
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const discountedPercentage =
            (product.discountedPrice / product.price) * 100;

          return (
            <li
              key={product.id}
              className="text-white bg-gray-800 hover:bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition  "
            >
              <Link href={`/product/${product.id}`} className="no-underline cursor-pointer">
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

</Link>
              
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
      </div>
    </div>
  );
}
