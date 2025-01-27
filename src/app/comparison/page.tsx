import Header from "../components/header";
import Footer from "@/app/components/footer";


import Image from "next/image";
import React from "react";

const comparison =() => {
  return (
    <>
      <div className="bg-background p-6">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Product Comparison</h1>
          <nav className="space-x-4">
            <a href="/" className="text-muted-foreground hover:text-muted">
              Home
            </a>
            <a href="/comparison" className="text-muted-foreground hover:text-muted">
              Comparison
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-6">
          <p className="text-muted-foreground">Go to Product page for more Products</p>
          <a href="/products" className="text-primary hover:underline">
            View More
          </a>
          <Header />
         
        </section>

        {/* Product Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Asgaard Sofa</h2>
            <p className="text-lg text-foreground">Rs. 250,000.00</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">⭐ 4.7</span>
              <span className="text-muted-foreground ml-2">(204 Reviews)</span>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Outdoor Sofa Set</h2>
            <p className="text-lg text-foreground">Rs. 224,000.00</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">⭐ 4.2</span>
              <span className="text-muted-foreground ml-2">(145 Reviews)</span>
            </div>
          </div>
        </div>

        {/* Add a Product */}
        <div className="mt-6">
          <label htmlFor="product-select" className="block text-muted-foreground mb-2">
            Add A Product
          </label>
          <select id="product-select" className="bg-input border border-border rounded-md p-2">
            <option>Choose a Product</option>
            <option>Asgaard Sofa</option>
            <option>Outdoor Sofa Set</option>
          </select>
        </div>

        {/* Product Details */}
        <div className="container mx-auto p-6 bg-background text-foreground">
          <h1 className="text-2xl font-bold mb-4">Product Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* General Details */}
            <div className="bg-card p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">General</h2>
              <table className="w-full mt-2">
                <tbody>
                  <tr>
                    <td className="font-medium">Sales Package</td>
                    <td>1 sectional sofa</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Model Number</td>
                    <td>TFBUBRGL85RHS</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Secondary Material</td>
                    <td>Solid Wood</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Configuration</td>
                    <td>L-shaped</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Upholstery Material</td>
                    <td>Fabric + Cotton</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Upholstery Color</td>
                    <td>Bright Grey & Lion</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Product Info */}
            <div className="bg-card p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Product</h2>
              <table className="w-full mt-2">
                <tbody>
                  <tr>
                    <td className="font-medium">Filling Material</td>
                    <td>Foam</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Finish Type</td>
                    <td>Bright Grey & Lion</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Adjustable Headrest</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Maximum Load Capacity</td>
                    <td>280 KG</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Origin of Manufacture</td>
                    <td>India</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dimensions */}
            <div className="bg-card p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Dimensions</h2>
              <table className="w-full mt-2">
                <tbody>
                  <tr>
                    <td className="font-medium">Width</td>
                    <td>265.32 cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Height</td>
                    <td>76 cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Depth</td>
                    <td>167.76 cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Weight</td>
                    <td>45 KG</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Seat Height</td>
                    <td>41.52 cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Leg Height</td>
                    <td>5.46 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Warranty */}
            <div className="bg-card p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Warranty</h2>
              <table className="w-full mt-2">
                <tbody>
                  <tr>
                    <td className="font-medium">Warranty Summary</td>
                    <td>1 Year Manufacturing Warranty</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Warranty Service Type</td>
                    <td>
                      For Warranty Claims or Any Product Related Issues Please Email at
                      operations@myfurniture.com
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Covered in Warranty</td>
                    <td>Warranty Against Manufacturing Defect</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Not Covered in Warranty</td>
                    <td>
                      The Warranty Does Not Cover Damages Due To Usage Of The Product. Buying Damage Is
                      Included Use And Wear Is Tolerated In The Natural Course Of Product Usage.
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Domestic Warranty</td>
                    <td>1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-lg">
              Add To Cart
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-6">
          <div className="flex gap-4 items-center">
            <Image src="/cup.png" width={80} height={120} alt="High Quality" />
            <div>
              <h5 className="font-poppins font-bold text-[24px]">High Quality</h5>
              <p className="text-[#898989]">Crafted from top materials</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Image src="/guarantee.png" width={80} height={120} alt="Warranty" />
            <div>
              <h5 className="font-poppins font-bold text-[24px]">Warranty Protection</h5>
              <p className="text-[#898989]">Over 2 years</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Image src="/shipping.png" width={80} height={120} alt="Shipping" />
            <div>
              <h5 className="font-poppins font-bold text-[24px]">Free Shipping</h5>
              <p className="text-[#898989]">Orders over $150</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Image src="/customer-support.png" width={80} height={120} alt="Support" />
            <div>
              <h5 className="font-poppins font-bold text-[24px]">24/7 Support</h5>
              <p className="text-[#898989]">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default comparison