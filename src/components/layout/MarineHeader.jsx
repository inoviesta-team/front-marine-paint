import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import useAuthStore from "@features/auth/zustand/useAuthStore";
import { History, LogOut, User } from "lucide-react";
import MarineButton from "@components/ui/MarineButton";
import useCartStore from "@features/cart/zustand/useCartStore";

export default function MarineHeader() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle
  const { user, isAuthenticated, logout } = useAuthStore();
  const { carts } = useCartStore();

  try {
    if (!isClient) setIsClient(true);
  } catch (error) {}

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about-us", label: "Tentang Kami" },
    { href: "/products", label: "Produk" },
    { href: "/projects", label: "Projek" },
    { href: "/articles", label: "Artikel" },
    { href: "/contact-us", label: "Kontak Kami" },
    { href: "/cart", label: "Keranjang", isCart: true },
  ];

  return (
    <header className="bg-white py-4 sm:py-3 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src="/images/logo.png" alt="Koko Lie" className="w-20" />
              {/* <span className="text-2xl font-bold text-marine-blue">
                Toko Koko Lie
              </span> */}
            </a>
          </div>

          {/* Hamburger Button (mobile only) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-marine-blue focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link, index) =>
              link.isCart ? (
                <a
                  key={index}
                  href={link.href}
                  className="font-sans font-bold text-marine-blue hover:text-marine-darkBlue flex items-center"
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
                  ({carts?.length || 0})
                </a>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="font-sans font-bold text-marine-blue hover:text-marine-darkBlue"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {isClient && isAuthenticated ? (
              <UserDropdown />
            ) : (
              <MarineButton variant="tertiary" className="rounded-xl" as="a" href="/account/login">Masuk</MarineButton>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            {navLinks.map((link, index) =>
              link.isCart ? (
                <a
                  key={index}
                  href={link.href}
                  className="block font-sans font-bold text-marine-blue hover:text-marine-darkBlue flex items-center"
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
                  ({carts?.length || 0})
                </a>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="block font-sans font-bold text-marine-blue hover:text-marine-darkBlue"
                >
                  {link.label}
                </a>
              )
            )}

            {/* Mobile login/logout */}
            {isClient && isAuthenticated ? (
              <UserDropdown />
            ) : (
              <MarineButton variant="tertiary" className="rounded-xl w-full lg:w-auto text-center" as="a" href="/account/login">Masuk</MarineButton>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function UserDropdown() {
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(event.target) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="w-full sm:w-auto relative inline-block text-left">
        <button
          ref={dropdownButtonRef}
          onClick={toggleDropdown}
          className="w-full sm:w-auto inline-flex justify-start gap-x-1.5 rounded-full bg-white pl-3 pr-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        >
          <div className="flex justify-start items-center">
            <img
              src="https://i.pravatar.cc/150"
              alt="User avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="text-start">
              <p className="font-sans text-sm font-bold text-marine-blue">
                {user.name}
              </p>
              <p className="font-sans text-xs font-normal text-marine-blue">
                {user.email}
              </p>
            </div>
          </div>
        </button>
        <div
          ref={dropdownMenuRef}
          className={`z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 ${
            isDropdownOpen ? "" : "hidden"
          }`}
        >
          <div
            className="py-2 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            <a
              href="/account"
              className="flex w-full rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              <User size={18} className="mr-2" />
              Profile
            </a>
            
            <a
              href="/order"
              className="flex w-full rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              <History size={18} className="mr-2" />
              Histori Transaksi
            </a>

            <button
              onClick={logout}
              className="flex w-full rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
