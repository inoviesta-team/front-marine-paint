import { useState } from "react";

import {
  Menu,
  Search,
  ShoppingCart,
  X
} from "lucide-react";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  return (
    <>
      {/* Header */}
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-blue-900 py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
                <span className="text-white font-bold text-xl">KL</span>
              </div>
              <span
                className={`font-bold text-xl ${
                  scrolled ? "text-blue-900" : "text-white"
                }`}
              >
                KOKO LIE
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="/"
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 font-medium transition-colors`}
              >
                Home
              </a>
              <a
                href="/products"
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 font-medium transition-colors`}
              >
                Product
              </a>
              <a
                href="#solutions"
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 font-medium transition-colors`}
              >
                Solutions
              </a>
              <a
                href="#technology"
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 font-medium transition-colors`}
              >
                Technology
              </a>
              <a
                href="#about"
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 font-medium transition-colors`}
              >
                About
              </a>
              <a
                href="#contact"
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } hover:text-blue-600 font-medium transition-colors`}
              >
                Contact
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                className={`p-2 rounded-full ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-blue-800"
                }`}
              >
                <Search size={20} />
              </button>
              <button
                className={`p-2 rounded-full ${
                  scrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-blue-800"
                }`}
              >
                <ShoppingCart size={20} />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-colors">
                Shop Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X
                  size={24}
                  className={scrolled ? "text-gray-900" : "text-white"}
                />
              ) : (
                <Menu
                  size={24}
                  className={scrolled ? "text-gray-900" : "text-white"}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          } bg-white shadow-xl absolute w-full`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="/"
                className="text-gray-800 hover:text-blue-600 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/products"
                className="text-gray-800 hover:text-blue-600 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#solutions"
                className="text-gray-800 hover:text-blue-600 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#technology"
                className="text-gray-800 hover:text-blue-600 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Technology
              </a>
              <a
                href="#about"
                className="text-gray-800 hover:text-blue-600 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:text-blue-600 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex">
                  <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                    <Search size={20} />
                  </button>
                  <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
                  Shop Now
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
