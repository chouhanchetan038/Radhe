import { Loading, ScrollToTop } from '@/components';
import Loader from '@/components/loaders/Loader';
import { getAuthReq } from '@/utils/apiHandlers';
import React, { useEffect, useState, useRef, useCallback } from 'react';

const GalleryImages = () => {
  const [imagesList, setImagesList] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const take = 10;
  const observerRef = useRef();

  const fetchImages = async (newSkip) => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    try {
      const res = await getAuthReq(`/gallery?skip=${newSkip}&take=${take}`);
      if (res.status) {
        const newImages = res.data?.data || [];
        setImagesList((prev) => [...prev, ...newImages]);
        setHasMore(newImages.length === take);
      } else {
        console.error(res.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(skip);
    //eslint-disable-next-line
  }, [skip]);

  const lastImageRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((prev) => prev + take);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore],
  );

  return (
    <>
      {isLoading && skip == 0 && <Loading />}
      <ScrollToTop />
      <section
        style={{ backgroundImage: 'url("/images/profile-bg.png")' }}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {imagesList.map((img, index) => {
            const isLast = index === imagesList.length - 1;
            return (
              <img
                key={index}
                ref={isLast ? lastImageRef : null}
                src={img?.image}
                alt={img?.alternative}
                className="rounded-lg shadow-md min-h-[150px] hover:scale-105 transition-transform duration-300"
              />
            );
          })}
        </div>

        {isLoading && (
          <>
            <Loader />
            {/* <div className="text-center mt-6 text-gray-500">Loading more...</div> */}
          </>
        )}
        {/* {!hasMore && (
        <div className="text-center mt-6 text-gray-400">
          No more images to load.
        </div>
      )} */}
      </section>
    </>
  );
};

export default GalleryImages;
