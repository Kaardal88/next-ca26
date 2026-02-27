"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartBadge } from "./CartBadge";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600 dark:hover:text-white"
              }
            >
              MyApp
            </Link>
          </div>
          <div>
            <div className="ml-10 flex items-baseline space-x-4 bg-blue-300 hover:bg-blue-400 rounded-2xl ">
              <Link
                href="/cart"
                className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/cart"
                    ? "text-black font-bold"
                    : "text-black hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className="relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                    alt="Cart"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <CartBadge />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
