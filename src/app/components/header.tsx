"use client";

import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { FaHeart, FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"; // Hamburger menu icons
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl?: string;
};

const Header: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Search query
  const [results, setResults] = useState<Product[]>([]); // Search results
  const [showResults, setShowResults] = useState<boolean>(false); // Show/hide dropdown
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Mobile menu toggle

  // Fetch search results
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch search results");

      const data = await res.json();
      setResults(data.results);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setShowResults(false); // Hide results if input is empty
    }
  };

  return (
    <header className="w-full border-b border-gray-300 bg-white">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-16 py-4 max-w-[1270px] mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl sm:text-2xl font-bold font-poppins text-black">
            Furniro
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-12">
          {["Home", "Shop", "Blog", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-black font-medium hover:text-gray-600"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Search Bar (Desktop Only) */}
        <div className="relative hidden md:flex items-center">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 rounded-full px-4 py-2"
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={handleInputChange}
              className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="text-black hover:text-gray-600 px-2"
            >
              <FaSearch />
            </button>
          </form>

          {/* Search Results Dropdown */}
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/shop/${product._id}`}
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-4"
                >
                  <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {showResults && results.length === 0 && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-lg rounded-lg p-4 text-center text-gray-500">
              No results found.
            </div>
          )}
        </div>

        {/* Icons Section (Always Visible) */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/cart">
            <MdOutlineShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link href="/account">
            <IoIosContact className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer hover:text-gray-600" />
          </Link>
          <Link href="/wishlist">
            <FaHeart className="w-5 h-5 sm:w-6 sm:h-6 text-black cursor-pointer hover:text-gray-600" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black hover:text-gray-600"
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiOutlineMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="block md:hidden bg-white border-t border-gray-300">
          {/* Links */}
          <nav>
            <ul className="flex flex-col items-center space-y-4 p-4">
              {["Home", "Shop", "Blog", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-black font-medium hover:text-gray-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="flex justify-center p-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={handleInputChange}
                className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                className="text-black hover:text-gray-600 px-2"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="p-4">
              {results.length > 0 ? (
                <div className="bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
                  {results.map((product) => (
                    <Link
                      key={product._id}
                      href={`/shop/${product._id}`}
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-4"
                    >
                      <img
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center">No results found.</div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
