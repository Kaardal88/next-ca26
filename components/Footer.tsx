import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div
        className="max-w-5xl mx-auto px-4 py-6
                  flex flex-col sm:flex-row
                  items-center justify-between gap-6"
      >
        <div className="flex flex-row items-center sm:items-start gap-8">
          <Image src={logo.src} width={80} height={50} alt="Logo" />

          <Link
            href="/contact"
            className="text-sm sm:text-base lg:text-lg text-white hover:text-blue-400"
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm sm:text-base">
        <p>Copyright &copy; Shop N&apos; Get 2026</p>
      </div>
    </footer>
  );
}
