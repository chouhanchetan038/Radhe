import { Loading } from '@/components';
import { getAuthReq } from '@/utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GallerySection = () => {
  const navigate = useNavigate();
  const [imagesList, setImagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMediaList = async () => {
    try {
      setIsLoading(true);
      const response = await getAuthReq('/gallery?skip=0&take=20');
      const { status, data, error } = response;
      if (status) {
        setImagesList(data?.data.slice(0, 6));
      } else {
        if (Array.isArray(error?.message)) {
          toast.error(error.message[0]);
        } else {
          toast.error(error?.message || 'Something went wrong');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch category list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMediaList();
  }, []);

  const animations = [
    { x: -50, opacity: 0 },
    { y: 50, opacity: 0 },
    { x: 50, opacity: 0 },
  ];

  return (
    <>
      {isLoading && <Loading />}
      <section
        id="gallery"
        className="py-12 px-4 md:px-16 bg-white text-gray-800"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Gallery</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            See the impact of our work through these images from our various
            programs and initiatives.
          </p>
          <div className="w-16 h-1 bg-green-600 mx-auto mt-3" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {imagesList.map((src, index) => (
            <>
              {/* <img
              key={index}
              src={src?.image}
              alt={src?.alternative}
              className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            /> */}
              <motion.img
                key={index}
                src={src?.image}
                alt={src?.alternative}
                initial={animations[index % animations.length]}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/gallery-images')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
          >
            View More Photos
          </button>
        </div>
      </section>
    </>
  );
};

export default GallerySection;
