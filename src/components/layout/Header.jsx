import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useCart } from "@hooks/useCart";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Default values before client-side hydration
  let user = null;
  let isAuthenticated = false;
  let logout = () => {};
  let itemCount = 0;

  // Only try to access the contexts on the client side
  try {
    const auth = useAuth();
    const cart = useCart();

    // Extract what we need from the contexts
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
    logout = auth.logout;
    itemCount = cart.itemCount;

    // If we get here, we're on the client side
    if (!isClient) setIsClient(true);
  } catch (error) {
    // We're being rendered on the server or outside the Providers
    // Use the default values defined above
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">ShopAstro</span>
            </a>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Home
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Products
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                About
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Contact
              </a>
            </nav>
          </div>

          <div className="flex items-center">
            <div className="ml-4 flow-root lg:ml-6">
              <a
                href="/cart"
                className="group flex items-center p-2 -m-2"
                aria-label="Shopping cart"
                transition:name="cart-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="sr-only">View your shopping cart</span>
                {isClient && itemCount > 0 && (
                  <span
                    className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                    aria-live="polite"
                  >
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                )}
              </a>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              {isClient && isAuthenticated ? (
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      id="user-menu-button"
                      aria-expanded={menuOpen}
                      aria-haspopup="true"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    </button>
                  </div>

                  {menuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <a
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Your Profile
                      </a>
                      <a
                        href="/account/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Orders
                      </a>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-x-4">
                  <a
                    href="/account/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </a>
                  <a
                    href="/account/register"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle className based on menu state */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Home
          </a>
          <a
            href="/products"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Products
          </a>
          <a
            href="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            About
          </a>
          <a
            href="/contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
