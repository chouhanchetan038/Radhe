// pages/KeyInitiatives.jsx

import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollToTop } from '@/components';

const initiatives = [
  {
    id: 1,
    title: 'Free Community Learning Centers (CLCs)',
    points: [
      'Evening coaching classes for underprivileged children',
      'Local educated youth volunteering as teachers',
      'Free books, stationery, and safe learning spaces',
    ],
    image: '/images/KeyInitiatives/educational/educationcard1.png',
  },
  {
    id: 2,
    title: 'Improving School Infrastructure',
    points: [
      'Donating benches, desks, and chalkboards',
      'Installing water filters and solar lighting',
      'Setting up smart classrooms with projectors and whiteboards',
    ],
    image: '/images/KeyInitiatives/educational/educationcard2.png',
  },
  {
    id: 3,
    title: 'Digital Learning Kit Distribution',
    points: [
      'Tablets with preloaded learning apps and content',
      'Solar-powered chargers for remote areas',
      'Focus on students from Grade 8 to 10',
    ],
    image: '/images/KeyInitiatives/educational/educationcard3.png',
  },
  {
    id: 4,
    title: 'Scholarship Program for Rural Talents',
    points: [
      'Annual scholarships between ₹5,000–₹15,000',
      'Selection based on merit and financial need',
      'Priority given to girl students',
    ],
    image: '/images/KeyInitiatives/educational/educationcard4.png',
  },
  {
    id: 5,
    title: 'Teacher Skill Development Workshops',
    points: [
      'Training rural school teachers in interactive methods',
      'Providing updated resource material',
      'Regular follow-up support and peer group learning',
    ],
    image: '/images/KeyInitiatives/educational/educationcard5.png',
  },
  {
    id: 6,
    title: 'Educational Awareness Campaigns',
    points: [
      'Street plays and poster rallies promoting Education for All',
      'Community meetings to raise awareness about girl child education',
      'Parent-teacher interactions in villages',
    ],
    image: '/images/KeyInitiatives/educational/educationcard6.png',
  },
  {
    id: 7,
    title: 'Adult Literacy Drives',
    points: [
      'Evening classes for illiterate adults, especially women',
      'Basic Hindi reading, arithmetic, and signing documents',
      'Building dignity and independence through literacy',
    ],
    image: '/images/KeyInitiatives/educational/educationcard7.png',
  },
];

const Education = () => {
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
            Lighting Lives Through Education — RADHE SHRINIVASA FOUNDATION’s
            Mission
          </h1>
          <p className="italic text-lg text-gray-700 mt-4">
            When every child learns, the entire village grows.
          </p>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
            At RADHE SHRINIVASA FOUNDATION, we believe education is the most
            powerful tool for lasting change. From early learning to digital
            access, here is how we are shaping brighter futures.
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

export default Education;
