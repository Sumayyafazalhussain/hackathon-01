'use client';

import React, { useState, useEffect } from "react"; // Only this import is needed
import Image from "next/image";
import Link from "next/link";

// Hero Component
const Hero = () => {
  return (
    <div className="relative w-full h-[713px] banner">
      <Image
        src="/herohero.jpg"
        width={1440}
        height={713} // Adjusted to maintain aspect ratio
        className="absolute w-full h-full object-cover"
        alt="Hero Image"
      />
      <div className="absolute z-30 top-2/4 right-12 w-full md:w-[643px] p-5 bg-[#FFF3E3] transform -translate-y-2/4">
        <h1 className="text-[#333333] font-poppins font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          New Arrival
        </h1>
        <h5 className="text-[32px] sm:text-[42px] md:text-[52px] text-[#B88E2F] font-poppins font-bold">
          Discover Our <br /> New Collection
        </h5>
        <p className="font-poppins font-bold text-[14px] sm:text-[16px] md:text-[18px] text-[#333333]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <button className="w-full sm:w-[222px] h-[74px] bg-[#B88E2F] text-[#FFFFFF] font-poppins font-bold px-[72px] py-[25px] mt-5">
          BUY Now
        </button>
      </div>
    </div>
  );
};

export default Hero;


// Hero1 Component





interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  discount?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  colorOptions?: string[];
}

interface CartItem extends Product {
  quantity: number;
}

export const Hero1 = () => {
  const [cart, setCart] = useState<CartItem[]>([]); // State for managing the cart items
  const [cartNotification, setCartNotification] = useState<boolean>(false); // State for showing cart notification

  // List of 8 products
  const products: Product[] = [
    { id: 1, name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, oldPrice: 3500000, image: '/images/1.png', discount: '-30%' },
    { id: 2, name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: '/image2.png' },
    { id: 3, name: 'Lolito', description: 'Luxury big sofa', price: 7000000, oldPrice: 14000000, image: '/images/3.png', discount: '-50%' },
    { id: 4, name: 'Respira', description: 'Outdoor bar table and stool', price: 500000, image: '/images/4.png' },
    { id: 5, name: 'Grifo', description: 'Night lamp', price: 1500000, image: '/images/5.png' },
    { id: 6, name: 'Muggo', description: 'Small mug', price: 150000, image: '/images/6.png' },
    { id: 7, name: 'Lagro', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: '/images/7.png', discount: '-50%' },
    { id: 8, name: 'Sereno', description: 'Minimalist flower pot', price: 500000, image: '/images/8.png' }
  ];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Store updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Show the notification message
      setCartNotification(true);

      // Hide notification after 5 seconds
      setTimeout(() => {
        setCartNotification(false);
      }, 5000);

      return updatedCart;
    });
  };

  return (
    <>
      {/* Notification for adding to cart */}
      {cartNotification && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-green-500 text-white text-center p-3 animate-slideDown">
          <p>Item added to cart!</p>
          <Link href="/cart">
            <button
              onClick={() => setCartNotification(false)} // Close notification when clicked
              className="ml-4 text-white underline"
            >
              View Cart
            </button>
          </Link>
        </div>
      )}

      {/* Hero Section with Grid for Products */}
      <div className="hero-section bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">Featured Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg shadow-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-64 group-hover:opacity-80 transition-all duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-2 text-sm rounded-full">
                      {product.discount}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 text-center group-hover:text-yellow-500 transition duration-300">{product.name}</h2>
                  <p className="text-gray-600 mt-2 text-center">{product.description}</p>
                  <div className="flex justify-center items-center mt-4 space-x-2">
                    {/* Display Old Price */}
                    {product.oldPrice && (
                      <p className="text-sm text-gray-500 line-through">{`Rp ${product.oldPrice.toLocaleString()}`}</p>
                    )}
                    {/* Display New Price with proper spacing */}
                    <p className="text-2xl font-bold text-gray-900">
                      Rp&nbsp;{product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Price and Discount Enhancement */}
                  <div className="mt-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-300 w-full"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};




// Hero3 Component
export const Hero3 = () => {
  const categories = [
    { id: 1, img: "/images/dining.png", title: "Dining" },
    { id: 2, img: "/images/living.png", title: "Living" },
    { id: 3, img: "/images/bed.png", title: "Bedroom" },
  ];

  return (
    <div className="flex justify-center items-center py-12 min-h-screen bg-gray-100">
      <div className="text-center max-w-screen-xl w-full px-4">
        <div className="mb-8">
          <h2 className="font-poppins font-bold text-[32px] text-[#333333] sm:text-[40px] md:text-[48px]">Browse The Range</h2>
          <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center rounded-lg overflow-hidden bg-white shadow-md w-full h-[480px]">
              <Image
                src={category.img}
                alt={category.title}
                width={381}
                height={400}
                className="object-cover w-full h-[400px]"
              />
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Hero4 Component


export const Hero4 = () => {
  const images = [
    { id: 1, src: "/images/care.png", alt: "Care" },
    { id: 2, src: "/images/dining.png", alt: "Dining" },
    { id: 3, src: "/images/care.png", alt: "Care" },
  ];

  const [currentIndex] = useState(0);
  const pairedImages = [
    { src1: "/images/care.png", src2: "/images/dining.png" },
    { src1: "/images/care.png", src2: "/images/dining.png" },
  ];

  return (
    <div className="bg-[#FCF8F3] py-12">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mb-4">50+ Beautiful Rooms Inspiration</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </p>
          <button className="bg-[#B88E2F] text-white py-3 px-6 rounded-lg hover:bg-[#a87929] transition duration-300">
            Explore More
          </button>
        </div>
        <div className="flex-1 relative">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 relative mb-4 sm:mb-0">
              <Image
                src={pairedImages[currentIndex].src1}
                alt={images[currentIndex].alt}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <div className="w-full sm:w-1/2 relative">
              <Image
                src={pairedImages[currentIndex].src2}
                alt={images[currentIndex].alt}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export const Hero5 = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center bg-white relative">
      <div className="absolute top-5 text-center px-4">
        <p className="text-sm font-semibold text-gray-500">Share Your Setup With</p>
        <h2 className="text-3xl font-bold mt-1">#FuniroFurniture</h2>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center items-center mt-20 p-4 gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[30%]">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[48%] h-[300px] relative">
              <Image src="/images/1.png" alt="Left Image 1" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="w-full lg:w-[48%] h-[150px] relative">
              <Image src="/images/f2.png" alt="Left Image 2" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[48%] h-[300px] relative">
              <Image src="/images/f3.png" alt="Left Image 3" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="w-full lg:w-[48%] h-[150px] relative">
              <Image src="/images/f4.png" alt="Left Image 4" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex justify-center items-center w-full lg:w-[20%] h-[300px] relative">
          <Image src="/images/FM.png" alt="Middle Image" layout="fill" objectFit="cover" className="rounded-lg" />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[30%]">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[48%] h-[300px] relative">
              <Image src="/images/FL.png" alt="Right Image 1" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="w-full lg:w-[48%] h-[300px] relative">
              <Image src="/images/FL2.png" alt="Right Image 2" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[48%] h-[250px] relative">
              <Image src="/images/fL3.png" alt="Right Image 3" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="w-full lg:w-[48%] h-[250px] relative">
              <Image src="/images/FL4.png" alt="Right Image 4" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
