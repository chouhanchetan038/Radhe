import React from 'react';
import { FaChild, FaTractor, FaGraduationCap, FaRunning } from 'react-icons/fa';
import { motion } from 'framer-motion';
const AboutSection = () => {
  return (
    <section id="about" className="py-12  px-4 md:px-16 bg-white text-gray-800">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          About Radhe Shrinivasa Foundation
        </h2>
        <div className="w-16 h-1 bg-green-600 mx-auto mt-3" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        {/* Image */}
        <div className="flex-1">
          {/* <img
            src="/images/about-image.png"
            alt="Team Meeting"
            className="rounded-lg w-full object-cover"
          /> */}
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            src="/images/about-image.png"
            alt="Team Meeting"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-6">
          {/* Mission */}
          <div>
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-sm text-gray-700">
              Radhe Shrinivasa Foundation is committed to developing,
              establishing, and promoting initiatives across education,
              commerce, arts, science, sports, social welfare, cultural
              preservation, and environmental protection to serve the
              underprivileged and foster community development.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-sm text-gray-700">
              We envision a society where every individual has access to quality
              education, sustainable livelihoods, and holistic development
              opportunities regardless of their socioeconomic background.
            </p>
          </div>

          {/* Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <FaChild />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Child Welfare</h4>
                <p className="text-xs text-gray-600">
                  Supporting orphanages and children’s development
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <FaGraduationCap />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Education</h4>
                <p className="text-xs text-gray-600">
                  Promoting access to quality learning
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <FaTractor />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Rural Development</h4>
                <p className="text-xs text-gray-600">
                  Sustainable agriculture and eco-tourism
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <FaRunning />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Sports Promotion</h4>
                <p className="text-xs text-gray-600">
                  Developing athletic talent at grassroots
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
