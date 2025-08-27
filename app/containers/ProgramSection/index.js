import React from 'react';
import { FaBook, FaLeaf, FaHome, FaTrophy, FaTree, FaOm } from 'react-icons/fa';

const programs = [
  {
    icon: <FaBook className="text-green-600 text-lg" />,
    title: 'Educational Support',
    points: [
      'Scholarship programs for underprivileged students',
      'School infrastructure development in rural areas',
      'Teacher training and capacity building',
      'Digital literacy programs for youth',
    ],
  },
  {
    icon: <FaLeaf className="text-green-600 text-lg" />,
    title: 'Agro-Tourism Initiatives',
    points: [
      'Sustainable farming demonstration centers',
      'Rural homestay development programs',
      'Organic farming training and certification',
      'Cultural heritage preservation projects',
    ],
  },
  {
    icon: <FaHome className="text-green-600 text-lg" />,
    title: 'Child Care Facilities',
    points: [
      'Orphanage management and support',
      'After-school programs for at-risk children',
      'Facilitate access to quality educational resources for children.',
      'Counseling and psychological support',
    ],
  },
  {
    icon: <FaTrophy className="text-green-600 text-lg" />,
    title: 'Sports Academies',
    points: [
      'Multi-sport training facilities',
      'Professional coaching for talented youth',
      'Sports equipment distribution programs',
      'Regional and national tournament organization',
    ],
  },
  {
    icon: <FaTree className="text-green-600 text-lg" />,
    title: 'Environmental Protection',
    points: [
      'Goshala (cow shelter) management',
      'Reforestation and tree planting drives',
      'Water conservation projects',
      'Waste management awareness campaigns',
    ],
  },
  {
    icon: <FaOm className="text-green-600 text-lg" />,
    title: 'Cultural & Religious Preservation',
    points: [
      'Temple restoration and maintenance',
      'Traditional arts and crafts promotion',
      'Cultural festivals and events organization',
      'Documentation of local cultural heritage',
    ],
  },
];

const ProgramsSection = () => {
  return (
    <section
      id="programs"
      className="py-12 px-4 md:px-16 bg-white text-gray-800"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Our Programs</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover the various programs we run to support our mission across
          different areas.
        </p>
        <div className="w-16 h-1 bg-green-600 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition transform  hover:scale-105"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-4">
              {program.icon}
            </div>
            <h3 className="font-semibold text-lg mb-3">{program.title}</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              {program.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramsSection;
