import React from "react";

const YellowBox = () => {
  return (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-md text-sm mb-6 flex items-center gap-4">
      <img src="./alert.png" className="bg-green w-4 h-4" />
      <div>
        <h1 className="font-bold text-black">Notice:</h1>
        <p>1st Note: UPI Validity is limited within 5 mins. Kindly Pay Immediately After Proceeded.</p>
      </div>
    </div>
  );
};

export default YellowBox;
