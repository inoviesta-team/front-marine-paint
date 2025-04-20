import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth";

export default function MarineHeader() {
  const [isClient, setIsClient] = useState(false);

  // Default values before client-side hydration
  let user = null;
  let isAuthenticated = false;
  let logout = () => {};

  // Only try to access the contexts on the client side
  try {
    const auth = useAuth();

    // Extract what we need from the contexts
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
    logout = auth.logout;

    // If we get here, we're on the client side
    if (!isClient) setIsClient(true);
  } catch (error) {
    // We're being rendered on the server or outside the Providers
    // Use the default values defined above
  }

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-marine-blue">
                Toko Koko Lie
              </span>
            </a>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a
              href="/"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue"
            >
              Home
            </a>
            <a
              href="/about-us"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue"
            >
              About Us
            </a>
            <a
              href="/products"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue"
            >
              Products
            </a>
            <a
              href="/projects"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue"
            >
              Projects
            </a>
            <a
              href="/articles"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue"
            >
              Articles
            </a>
            <a
              href="/contact-us"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue"
            >
              Contact Us
            </a>
            <a
              href="/cart"
              className="font-mono font-bold text-marine-blue hover:text-marine-darkBlue flex items-center"
            >
              <svg
                className="w-6 h-6 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              (2)
            </a>
          </nav>

          {/* Search and Login */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Produk"
                className="bg-gray-100 border border-marine-blue rounded px-4 py-1 text-sm font-mono w-40"
              />
            </div>

            {isClient && isAuthenticated ? (
              <button
                onClick={logout}
                className="border border-marine-blue bg-marine-blue text-white rounded px-4 py-1 text-sm font-mono font-bold hover:bg-marine-darkBlue"
              >
                Log out
              </button>
            ) : (
              <a
                href="/account/login"
                className="border border-marine-blue bg-marine-blue text-white rounded px-4 py-1 text-sm font-mono font-bold hover:bg-marine-darkBlue"
              >
                Log in
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
