import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigation = (sectionId, navigate, location) => {
    if (location?.pathname === '/') {
      const el = document.querySelector(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = sectionId;
      }
    } else {
      navigate(`/${sectionId}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Foundation Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Radhe Shrinivasa Foundation
          </h4>
          <p className="text-sm mb-4">
            Dedicated to creating positive change through education, rural
            development, child welfare, and sports promotion across India.
          </p>
          <div className="flex gap-4 text-lg text-white mt-2">
            <FaFacebookF className="hover:text-green-500 cursor-pointer" />
            <FaTwitter className="hover:text-green-500 cursor-pointer" />
            <FaInstagram className="hover:text-green-500 cursor-pointer" />
            <FaYoutube className="hover:text-green-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:text-green-400 cursor-pointer"
              onClick={() => handleNavigation('#about', navigate, location)}
            >
              About Us
            </li>
            <li
              className="hover:text-green-400 cursor-pointer"
              onClick={() =>
                handleNavigation('#initiatives', navigate, location)
              }
            >
              Our Initiatives
            </li>
            <li
              className="hover:text-green-400 cursor-pointer"
              onClick={() => handleNavigation('#programs', navigate, location)}
            >
              Programs
            </li>
            <li
              className="hover:text-green-400 cursor-pointer"
              onClick={() => handleNavigation('#gallery', navigate, location)}
            >
              Gallery
            </li>
            <li
              className="hover:text-green-400 cursor-pointer"
              onClick={() => handleNavigation('#donate', navigate, location)}
            >
              Donate
            </li>
            <li
              className="hover:text-green-400 cursor-pointer"
              onClick={() => navigate('/contact-us')}
            >
              Contact Us
            </li>
          </ul>
        </div>

        {/* Program Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Programs</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-green-400">
                Educational Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Agro-Tourism
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Child Care Facilities
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Sports Academies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Environmental Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Cultural Preservation
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">
            Subscribe to our newsletter to stay updated with our work and
            impact.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 w-full rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-green-600 px-4 py-2 rounded-r-md text-white hover:bg-green-700">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col lg:flex-row justify-between items-center gap-4">
        <p>© 2025 Radhe Shrinivasa Foundation. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-green-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-green-400">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
