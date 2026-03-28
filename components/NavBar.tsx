"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartBadge } from "./CartBadge";
import logo from "../assets/logo.png";
import Image from "next/image";

import { FaShoppingCart } from "react-icons/fa";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-32 bg-gray-900 shadow flex items-center ">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" flex items-center justify-between max-w-5xl mx-auto ">
          <div className="shrink-0">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-blue-600 font-bold"
                  : "text-gray-600 hover:text-white"
              }
            >
              <span>
                <Image src={logo.src} width={120} height={50} alt="Logo" />
              </span>
            </Link>
          </div>

          <div className="space-between flex">
            <Link
              href="/contact"
              className={`relative inline-flex items-center px-3 text-white hover:text-blue-300 hover:border py-2 rounded-md text-sm sm:text-base lg:text-lg font-medium  ${
                pathname === "/contact"
              }`}
            >
              Contact
            </Link>

            <div className="ml-10 flex items-baseline space-x-4 transition hover:scale-110    rounded-2xl ">
              <Link
                href="/cart"
                className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium   ${
                  pathname === "/cart"
                }`}
              >
                <span className="relative ">
                  <div className="  border border-gray-500 hover:bg-blue-600   rounded-full p-2 sm:text-1xl lg:text-2xl">
                    <FaShoppingCart className="fill-blue-300 hover:fill-blue-100" />{" "}
                  </div>

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
