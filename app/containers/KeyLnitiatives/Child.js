// pages/KeyInitiatives.jsx

import { reactIcons } from '@/utils/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollToTop } from '@/components';

const initiatives = [
  {
    id: 1,
    title: 'Free Education Support',
    points: [
      'Running tuition classes and after-school programs',
      'Distribution of school supplies: bags, books, uniforms, and shoes',
      'Scholarships for meritorious and needy children',
    ],
    image: '/images/KeyInitiatives/child/child1.png',
  },
  // {
  //   id: 2,
  //   title: 'Mid-Day Meals & Nutrition Drive',
  //   points: [
  //     'Daily nutritious meals in schools or learning centers',
  //     'Health supplements and milk distribution',
  //     'Regular height-weight-health tracking',
  //   ],
  //   image: '/images/KeyInitiatives/child/child2.png',
  // },
  {
    id: 2,
    title: 'Child Health Camps',
    points: [
      'Free medical and dental check-ups for children',
      'Vaccination drives and eye-checkup camps',
      'Awareness on hygiene and healthy habits',
    ],
    image: '/images/KeyInitiatives/child/child3.png',
  },
  {
    id: 3,
    title: 'Rescue and Rehabilitation Support',
    points: [
      'Helping children affected by child labor, begging, or abuse',
      'Connecting to shelter homes or government programs',
      'Legal aid and counseling with expert partners',
    ],
    image: '/images/KeyInitiatives/child/child4.png',
  },
  {
    id: 4,
    title: 'Child Rights Awareness',
    points: [
      'School-based workshops on child rights and safety',
      'Campaigns on preventing child marriage and abuse',
      'Promoting inclusive education for differently-abled kids',
    ],
    image: '/images/KeyInitiatives/child/child5.png',
  },
  {
    id: 5,
    title: 'Recreational & Cultural Activities',
    points: [
      'Annual sports days, arts & crafts camps, music/dance workshops',
      'Talent shows and drawing competitions to build confidence',
      'Library corners with storybooks and games',
    ],
    image: '/images/KeyInitiatives/child/child6.png',
  },
];

const Child = () => {
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
            Nurturing the Future – Our Child Welfare Initiatives
          </h1>
          <p className="italic text-lg text-gray-700 mt-4">
            Every child deserves education, protection, and a chance to thrive.
          </p>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
            At RADHE SHRINIVASA FOUNDATION, we believe that children are the
            heart of a better tomorrow. Through our child welfare programs, we
            focus on health, education, safety, and holistic development of
            underprivileged children in rural and semi-urban areas.
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

export default Child;
