import React from 'react';

const RaiseFundCard = () => {
  return (
    <div className="bg-green-100 rounded-lg p-4 flex flex-col gap-y-4">
      <img
        src="/images/KeyInitiatives/educational.png"
        alt="Campaign"
        className="rounded-md"
      />
      <h3 className="text-lg font-semibold" style={{ marginTop: '10px' }}>
        Raise Funds For Child Education
      </h3>
      <div className="flex items-center" style={{ marginTop: '10px' }}>
        <button
          type="button"
          className="border border-green-500 text-green-500 px-6 py-2 rounded-full font-semibold hover:bg-green-100"
        >
          Donate Details
        </button>
      </div>
    </div>
  );
};

export default RaiseFundCard;
