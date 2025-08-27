import React from 'react';
import { FaGraduationCap, FaLeaf, FaChild, FaRunning } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const initiatives = [
  {
    icon: <FaGraduationCap />,
    title: 'Educational Development',
    description:
      'Promoting education, arts, science, and cultural advancement through targeted programs and infrastructure development.',
    img: '/images/KeyInitiatives/educational.png',
    path: '/key-initiatives-education',
  },
  {
    icon: <FaLeaf />,
    title: 'Rural Development',
    description:
      'Developing agro-tourism, sustainable agriculture, and creating employment opportunities in rural communities.',
    img: '/images/KeyInitiatives/rural.png',
    path: '/key-initiatives-rural',
  },
  {
    icon: <FaChild />,
    title: 'Child Welfare',
    description:
      'Establishing and managing orphanages and childrens homes, providing shelter, and holistic development programs.',
    img: '/images/KeyInitiatives/childwelfare.png',
    path: '/key-initiatives-child',
  },
  {
    icon: <FaRunning />,
    title: 'Sports Promotion',
    description:
      'Creating sports academies, providing coaching, and organizing tournaments to develop athletic talent from grassroots levels.',
    img: '/images/KeyInitiatives/sports.png',
    path: '/key-initiatives-sports',
  },
];

const InitiativesSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="initiatives"
      className="py-12 px-4 md:px-16 bg-white text-gray-800"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Our Key Initiatives</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          We focus on four main areas to create meaningful impact in communities
          across India.
        </p>
        <div className="w-16 h-1 bg-green-600 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {initiatives.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600 text-lg">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-md">{item.title}</h4>
              </div>
              <p className="text-sm text-gray-600 flex-grow">
                {item.description}
              </p>
              <span
                onClick={() => navigate(item?.path)}
                className="mt-4 text-green-600 cursor-pointer text-sm font-medium hover:underline flex items-center gap-1"
              >
                Learn more <span className="text-green-600">→</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InitiativesSection;
