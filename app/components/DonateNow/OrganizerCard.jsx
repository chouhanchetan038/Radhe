import React from "react";

const OrganizerCard = () => {
  return (
    <div className="bg-green-100 rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold">Organizer</h2>
       <div className="flex gap-3 text-center">
        <img src="./profile.png" className="h-10 w-10" />
        <p>Chirag Shah</p>
       </div>
       <div className="flex gap-3 text-center border-t-[1px] border-green-500 pt-4 mt-2"> 
       <img src="./vector.svg" className="h-[10px] w-[10px]" />
       <p>Addresh: 21 new delhi</p>
       </div>
     
    </div>
  );
};

export default OrganizerCard;
