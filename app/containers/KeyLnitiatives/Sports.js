// pages/KeyInitiatives.jsx

import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollToTop } from '@/components';

const initiatives = [
  {
    id: 1,
    title: 'Sports Equipment Distribution',
    points: [
      'Free supply of footballs, cricket kits, badminton rackets, etc.',
      'Uniforms and shoes for underprivileged school children',
      'Regular replenishment of damaged or worn-out gear',
    ],
    image: '/images/KeyInitiatives/sports/sports1.png',
  },
  {
    id: 2,
    title: 'Organizing Local Sports Tournaments',
    points: [
      'Inter-school & inter-village competitions (e.g., kabaddi, kho-kho, cricket)',
      'Medal distribution and motivational speeches by local leaders',
      'Creating platforms for rural athletes to shine',
    ],
    image: '/images/KeyInitiatives/sports/sports2.png',
  },
  {
    id: 3,
    title: ' Building & Maintaining Playgrounds',
    points: [
      'Renovation of existing playgrounds in villages',
      'Installation of basic facilities like goalposts, markings, benches',
      'Safe and accessible space for regular practice',
    ],
    image: '/images/KeyInitiatives/sports/sports3.png',
  },
  {
    id: 4,
    title: 'itness & Physical Training Camps',
    points: [
      'Short-term sports training programs by certified coaches',
      'Awareness sessions on fitness, diet, and sportsmanship',
      'Focus on both boys and girls to break gender stereotypes',
    ],
    image: '/images/KeyInitiatives/sports/sports4.png',
  },
  {
    id: 5,
    title: 'Supporting Talented Athletes',
    points: [
      'Sponsorships for talented youth to attend state/national level tournaments',
      'Help with registration fees, travel costs, and sports gear',
      'Mentorship from experienced players or coaches',
    ],
    image: '/images/KeyInitiatives/sports/sports5.png',
  },
  {
    id: 6,
    title: ' Promoting Traditional Sports',
    points: [
      'Reviving interest in regional games like Mallakhamb, Kho-Kho, Langdi',
      'Organizing cultural-sports festivals in villages',
      'Encouraging community participation and pride',
    ],
    image: '/images/KeyInitiatives/sports/sports6.png',
  },
  {
    id: 7,
    title: ' Inclusive Sports for All',
    points: [
      'Ensuring differently-abled children also get access to fun games',
      'Non-competitive, inclusive sporting events',
      'Promoting “Sports for Joy” for everyone regardless of skill',
    ],
    image: '/images/KeyInitiatives/sports/sports7.png',
  },
];

const Sports = () => {
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

      <div className="max-w-6xl mx-auto px-4 pb-6 pt-3">
        {/* Header Section */}

        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            Nurturing Talent, Building Futures – Our Sports Promotion
            Initiatives
          </h1>

          <p className="italic text-lg text-gray-700 mt-4">
            “Sports teach discipline, teamwork, and confidence – values that
            change lives.”
          </p>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
            At RADHE SHRINIVASA FOUNDATION, we believe in the transformative
            power of sports. By promoting sports in rural and semi-urban areas,
            we aim to unlock hidden talent, boost health, and foster community
            spirit.
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

export default Sports;
