import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageSwiper } from '@/components';
import { isLoggedIn } from '@/utils/apiHandlers';

const HeroSection = () => {
  const navigate = useNavigate();
  const isLogin = isLoggedIn();
  const handleNavigation = (sectionId) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = sectionId;
    }
  };
  return (
    <section className="bg-green-50 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left: Text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Empowering Communities Through{' '}
            <span className="text-green-600">Compassion</span> &{' '}
            <span className="text-green-600">Action</span>
          </h1>
          <p className="text-gray-700 mt-6 max-w-xl mx-auto lg:mx-0">
            Radhe Shrinivasa Foundation is dedicated to education, rural
            development, child welfare, and sports promotion to create
            sustainable positive change in communities across India.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button
              onClick={() => handleNavigation('#initiatives')}
              className="bg-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-700 transition"
            >
              Our Initiatives
            </button>
            {!isLogin && (
              <button
                onClick={() => navigate('/login')}
                className="border border-green-600 text-green-600 px-6 py-3 rounded-full text-sm font-semibold hover:text-green-700 hover:border-green-700 transition"
              >
                Support Us
              </button>
            )}
          </div>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          className="flex-1 w-full md:w-[85%] lg:w-[50%]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <ImageSwiper />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
