import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Farmer, Madhya Pradesh',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'The sustainable farming techniques I learned through Radhe Shrinivasa Foundation have doubled my crop yield while reducing costs. Their agro-tourism initiative has also brought additional income to our entire village.',
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Teacher, Delhi',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'The foundation’s work in rural education is transformative. They’ve not only built infrastructure but also trained teachers and provided learning materials. I’ve seen firsthand how this comprehensive approach is changing children’s lives.',
    stars: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Sports Coach, Maharashtra',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    text: 'The sports academy established by Radhe Shrinivasa Foundation has discovered and nurtured so many talented athletes who would otherwise never have had the opportunity. Their holistic approach to sports development is exactly what India needs.',
    stars: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 px-4 md:px-16 bg-white text-gray-800">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">What People Say</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Hear from those who have experienced the impact of our work firsthand.
        </p>
        <div className="w-16 h-1 bg-green-600 mx-auto mt-3" />
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 italic mb-4">{item.text}</p>
            <div className="flex text-yellow-400">
              {Array.from({ length: item.stars }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
