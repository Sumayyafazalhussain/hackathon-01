import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      {/* Main Footer Section */}
      <div className="flex flex-wrap justify-between px-6 sm:px-8 lg:px-10 py-8 max-w-[1140px] mx-auto text-sm">
        {/* Left Section - Address */}
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
          <h2 className="font-poppins font-normal text-[16px] leading-[24px] mb-4 text-gray-500">
            Funiro.
          </h2>
          <address className="not-italic text-sm text-gray-600 leading-6">
            400 University Drive Suite 200 <br />
            Coral Gables, <br />
            FL 33134 USA
          </address>
        </div>

        {/* Center Section - Links and Help */}
        <div className="flex w-full sm:w-2/3 lg:w-1/3 justify-between gap-4 mb-6 sm:mb-0">
          {/* Links Column */}
          <div className="w-1/2">
            <h3 className="font-poppins font-medium text-[16px] leading-[24px] mb-4 text-gray-500">
              Links
            </h3>
            <ul className="space-y-3 text-gray-600">
              {["Home", "Shop", "About", "Contact"].map((item, index) => (
                <li
                  key={index}
                  className="font-poppins font-semibold hover:underline cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div className="w-1/2">
            <h3 className="font-poppins font-medium text-[16px] leading-[24px] mb-4 text-gray-500">
              Help
            </h3>
            <ul className="space-y-3 text-gray-600">
              {["Payment Options", "Returns", "Privacy Policies"].map(
                (item, index) => (
                  <li
                    key={index}
                    className="font-poppins font-semibold hover:underline cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Right Section - Newsletter */}
        <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
          <h3 className="font-poppins font-medium text-[16px] leading-[24px] mb-4 text-gray-500">
            Newsletter
          </h3>
          <form
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-2"
            aria-label="Newsletter Form"
          >
            <input
              type="email"
              placeholder="Enter Your Email Address"
              aria-label="Enter your email address"
              className="p-3 text-sm w-full sm:flex-grow border-b border-gray-400 focus:outline-none"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="font-poppins font-semibold text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-xs">
        <p>2023 Funiro. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
