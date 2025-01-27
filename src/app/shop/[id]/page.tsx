"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sanityFetch } from "../../../sanity/lib/fetch";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  discountPercentage?: number;
  tags?: string[];
  quantity?: number;
};

const placeholderImage = "https://via.placeholder.com/300";

const ProductDetail = () => {
  const params = useParams();
  const id = params?.id as string; // Explicitly cast id to string
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]); // State for the cart
  const [cartModalVisibility, setCartModalVisibility] = useState(false); // Modal visibility
  const [quantity, setQuantity] = useState(1); // Quantity for the product

  useEffect(() => {
    if (!id) {
      console.error("ID parameter is missing.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const productQuery = `
          *[_type == "product" && _id == $id][0] {
            _id,
            title,
            description,
            price,
            discountPercentage,
            tags,
            "imageUrl": productImage.asset->url
          }
        `;
        const productResult = await sanityFetch({ query: productQuery, params: { id } });
        setProduct(productResult);

        if (productResult?.tags) {
          const relatedQuery = `
            *[_type == "product" && _id != $id && count(tags[@ in $tags]) > 0] {
              _id,
              title,
              price,
              "imageUrl": productImage.asset->url
            }
          `;
          const relatedResult = await sanityFetch({
            query: relatedQuery,
            params: { id, tags: productResult.tags },
          });
          setRelatedProducts(relatedResult);
        }

        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product or related products:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      alert("Product details are unavailable. Please try again later.");
      return;
    }

    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity =
        (updatedCart[existingProductIndex].quantity || 1) + quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartModalVisibility(true);
  };

  const closeModal = () => {
    setCartModalVisibility(false);
  };

  if (loading) return <p className="text-center text-yellow-500">Loading...</p>;

  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative">
              <img
                src={product.imageUrl || placeholderImage}
                alt={product.title}
                className="w-full h-96 object-cover transform transition-transform hover:scale-105"
              />
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                <p className="mt-4 text-gray-600 text-sm">{product.description}</p>
                <div className="mt-6">
                  <p className="text-2xl font-bold text-gray-800">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.discountPercentage && (
                    <p className="text-green-600 font-medium text-sm mt-2">
                      {product.discountPercentage}% Off
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-6">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:bg-blue-700 transition"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related._id}
                  className="bg-white border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
                  onClick={() => router.push(`/shop/${related._id}`)}
                >
                  <img
                    src={related.imageUrl || placeholderImage}
                    alt={related.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 mt-2">${related.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {cartModalVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Product Added to Cart
            </h2>
            <div className="text-center">
              <p className="text-gray-600">
                You have added <strong>{product?.title}</strong> to your cart.
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Continue Shopping
              </button>
              <a
                href="/cart"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Cart
              </a>
            </div>
          </div>
        </div>
      )}
      <br />
      <Footer />
    </>
  );
};

export default ProductDetail;
