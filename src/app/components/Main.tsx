'use client';

import React, { useState, useEffect } from "react";
import { sanityFetch } from "../../sanity/lib/fetch";
import { allProductsQuery } from "../../sanity/lib/queries";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  tags?: string[];
  dicountPercentage?: number;
  isNew?: boolean;
  quantity?: number;
};

const placeholderImage = "https://via.placeholder.com/300";

const Main: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]); // State for cart
  const [cartModalVisibility, setCartModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const storedCart = localStorage.getItem("cart");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const fetchData = async () => {
      try {
        const fetchedProducts = await sanityFetch({ query: allProductsQuery });
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
        alert("There was an issue loading the products. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const toggleWishlist = (product: Product) => {
    const existingProductIndex = wishlist.findIndex((item) => item._id === product._id);
    let updatedWishlist;

    if (existingProductIndex !== -1) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity =
        (updatedCart[existingProductIndex].quantity || 1) + 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartModalVisibility(true);
  };

  const closeModal = () => {
    setCartModalVisibility(false);
  };

  return (
    <div className="min-h-screen bg-white px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
        <p className="text-xl text-gray-600 mt-2 mb-4">Our Best Products are Here</p>
      </div>

      {loading && <p className="text-center text-yellow-400">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 relative"
          >
            <div className="relative w-full h-64">
              <img
                src={product.imageUrl || placeholderImage}
                alt={product.title || "Product image"}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{product.description.slice(0, 100)}...</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-600">Price:</span>
                  <span className="text-xl font-bold text-gray-800">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </span>
                </div>
                {product.dicountPercentage && (
                  <p className="text-green-500 text-sm">
                    {product.dicountPercentage}% Off
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="text-2xl"
                >
                  {wishlist.find((item) => item._id === product._id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-red-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartModalVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Product Added To Cart
            </h2>
            <div className="overflow-y-auto max-h-40">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-4 mb-4">
                  <img
                    src={item.imageUrl || placeholderImage}
                    alt={item.title || "Product image"}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-800">{item.title}</h4>
                    <span className="text-gray-600">x{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Continue Shopping
              </button>
              <a
                href="/cart"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Visit Cart
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;