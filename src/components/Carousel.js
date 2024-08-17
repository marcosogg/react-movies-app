import React, { useRef } from 'react';

const Carousel = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        onClick={() => scroll(-200)}
      >
        &#8249;
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        onClick={() => scroll(200)}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;