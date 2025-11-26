import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4f7fa] text-gray-600 py-12 px-10 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-black text-3xl">🏠</span> QuickStay
          </h2>
          <p className="mt-3 text-sm leading-6">
            Discover the world's most extraordinary places to stay, from boutique
            hotels to luxury villas and private islands.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl">
            <FaInstagram className="cursor-pointer hover:text-black" />
            <FaFacebookF className="cursor-pointer hover:text-black" />
            <FaTwitter className="cursor-pointer hover:text-black" />
            <FaLinkedinIn className="cursor-pointer hover:text-black" />
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Partners</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Safety Information</li>
            <li>Cancellation Options</li>
            <li>Contact Us</li>
            <li>Accessibility</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">STAY UPDATED</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for travel inspiration and special offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-l-md px-3 py-2 w-full outline-none"
            />
            <button className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800">
              →
            </button>
          </div>
        </div>

      </div>

      {/* Bottom strip */}
      <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
        <p>© 2025 QuickStay. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  );
}
