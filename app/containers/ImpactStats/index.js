import React from 'react';
import CountUp from 'react-countup';

const ImpactStats = () => {
  const stats = [
    { number: 5000, suffix: '+', label: 'Children Supported' },
    { number: 120, suffix: '+', label: 'Villages Reached' },
    { number: 3500, suffix: '+', label: 'Farmers Trained' },
    { number: 1800, suffix: '+', label: 'Athletes Coached' },
  ];

  return (
    <section className="bg-green-600 text-white py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl text-white font-semibold">
          Our Impact in Numbers
        </h2>
        <div className="w-14 h-1 bg-white mt-2 mx-auto" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-3xl md:text-4xl text-white font-bold">
              <CountUp end={stat.number} duration={3} separator="," />
              {stat.suffix}
            </p>
            <p className="mt-2 text-sm md:text-base text-white">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
