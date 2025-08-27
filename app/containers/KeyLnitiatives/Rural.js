// pages/KeyInitiatives.jsx

import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollToTop } from '@/components';

const initiatives = [
  {
    id: 1,
    title: 'Clean Drinking Water Projects',
    points: [
      'Installation of handpumps and water purifiers',
      'Rainwater harvesting systems in drought-prone areas',
      'Free books, stationery, and safe learning spaces',
    ],
    image: '/images/KeyInitiatives/rural/rural1.png',
  },
  {
    id: 2,
    title: 'Health & Hygiene Camps',
    points: [
      'Free medical check-ups in remote villages',
      'Distribution of sanitary pads and hygiene kits',
      'Health awareness sessions on nutrition and disease prevention',
    ],
    image: '/images/KeyInitiatives/rural/rural2.png',
  },
  {
    id: 3,
    title: 'Women Empowerment through Self-Help Groups (SHGs)',
    points: [
      'Skill training in handicrafts, papad-making, tailoring',
      'Microfinance support and entrepreneurship guidance',
      'Promoting financial literacy among rural women',
    ],
    image: '/images/KeyInitiatives/rural/rural3.png',
  },
  {
    id: 4,
    title: 'Village Sanitation Drives',
    points: [
      'Construction of toilets in underserved homes',
      'Waste disposal and cleanliness awareness programs',
      'Community-led cleanliness competitions',
    ],
    image: '/images/KeyInitiatives/rural/rural4.png',
  },
  {
    id: 5,
    title: ' Sustainable Agriculture Support',
    points: [
      'Organic farming training and tools for small farmers',
      'Distribution of high-yield seeds and compost',
      'Crop rotation and water-efficient farming techniques',
    ],
    image: '/images/KeyInitiatives/rural/rural5.png',
  },
  {
    id: 6,
    title: ' Tree Plantation & Green Initiatives',
    points: [
      'Mass plantation drives near schools and roadsides',
      'Community ownership of green spaces',
      'Promoting eco-awareness among youth',
    ],
    image: '/images/KeyInitiatives/rural/rural6.png',
  },
  {
    id: 7,
    title: 'Livelihood & Vocational Training',
    points: [
      'Free training in trades like carpentry, plumbing, electrician work',
      'Placement support and certification',
      'Special focus on unemployed rural youth',
    ],
    image: '/images/KeyInitiatives/rural/rural7.png',
  },
];

const Rural = () => {
  const navigate = useNavigate();
  return (
    <>
      <ScrollToTop />
      <div className="px-3 md:px-6 mt-3 ">
        {' '}
        <div
          onClick={() => navigate(-1)}
          className="bg-green-100  w-10 h-10 flex justify-center items-center text-green-600 p-2 rounded-full"
        >
          {reactIcons?.leftArrow}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Empowering Villages – Our Rural Development Initiatives
          </h1>
          <p className="italic text-lg text-gray-700 mt-4">
            “When a village thrives, the nation rises.”
          </p>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
            RADHE SHRINIVASA FOUNDATION is committed to building self-sustained,
            empowered rural communities. Our rural development work covers
            health, livelihood, sanitation, women empowerment, and environmental
            sustainability.
          </p>
        </div>

        {/* Initiatives List */}
        {initiatives.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center gap-8 mb-16`}
          >
            {/* Image */}
            <motion.div
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-[35%]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold text-primary-100 flex items-center">
                <span className="text-white bg-primary-100 rounded-full w-[40px] h-[40px] flex items-center justify-center py-1 text-xl mr-2">
                  {item.id}
                </span>
                {item.title}
              </h2>
              <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside text-base ml-[40px]">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Rural;
