import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-[100vh] w-[100vw] flex items-center justify-center  backdrop-blur-[5px] z-[999]">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
