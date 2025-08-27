import React from 'react';

const DonateSection = () => {
  return (
    <section
      id="donate"
      className="bg-green-700 py-12 px-4 md:px-16 text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Support Our Cause</h2>
          <p className="text-sm mb-8 max-w-md">
            Your donation, no matter how small, can make a significant
            difference in the lives of those we serve. All contributions are
            used directly for our programs and initiatives.
          </p>

          {/* Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-green-800">
            <div className="bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-bold mb-1">₹1,000</h3>
              <p className="text-sm">
                Provides educational materials for 5 children for a month
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-bold mb-1">₹5,000</h3>
              <p className="text-sm">
                Supports a farmer with sustainable farming training
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-bold mb-1">₹10,000</h3>
              <p className="text-sm">
                Sponsors sports equipment for a rural school
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <h3 className="text-lg font-bold mb-1">₹25,000</h3>
              <p className="text-sm">
                Helps maintain a children&apos;s home for a month
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-6 bg-white text-green-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
            Donate Now
          </button>
        </div>

        {/* Right Column - Donation Form */}
        <div className="bg-white text-gray-800  rounded-lg shadow-lg p-6 w-full max-w-md mx-auto ">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Make a Donation
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Choose Initiative
              </label>
              <select className="w-full border border-gray-300 px-4 py-2 rounded-md">
                <option>Education Support</option>
                <option>Rural Development</option>
                <option>Child Welfare</option>
                <option>Sports Promotion</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
