"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/cart"
                className={
                  pathname === "/cart"
                    ? "text-blue-600 font-bold"
                    : " text-gray-500  hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
