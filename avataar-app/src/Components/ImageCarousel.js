import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

const ImageCarousel = () => {
  const images = [
    {
      src: '/CarouselImages/black.jpg',
      alt: 'Image 1',
      description: 'Description 1',
    },
    {
      src: '/CarouselImages/color.jpg',
      alt: 'Image 2',
      description: 'Description 2',
    },
    {
      src: '/CarouselImages/gold.jpg',
      alt: 'Image 3',
      description: 'Description 3',
    },
    {
      src: '/CarouselImages/green.jpg',
      alt: 'Image 4',
      description: 'Description 4',
    },
    {
      src: '/CarouselImages/purple.jpg',
      alt: 'Image 5',
      description: 'Description 5',
    },
  ];
  
  const [carouselState, setCarouselState] = useState(3);

  const hideDesc = () => {
    setIsHidden(true);
    setTimeout(() => {
      setIsHidden(false);
    }, 1000);
  }

  const [isHidden, setIsHidden] = useState(false);

  const imageFunc1 = () => {
    setCarouselState(4);
    hideDesc();
  }

  const imageFunc2 = () => {
    setCarouselState(5);
    hideDesc();
  }

  const imageFunc3 = () => {
    setCarouselState(1);
    hideDesc();
  }

  const imageFunc4 = () => {
    setCarouselState(2);
    hideDesc();
  }

  const imageFunc5 = () => {
    setCarouselState(3);
    hideDesc();
  }

  const goLeft = () => {
    setCarouselState((prev) => (prev === 1 ? 5 : prev - 1));
    hideDesc();
  };

  const goRight = () => {
    setCarouselState((prev) => (prev % 5) + 1);
    hideDesc();
  };

  useEffect(() => {
    const intervalId = setInterval(goRight, 3500);
    return () => clearInterval(intervalId);
  }); // Empty dependency array to run the effect only once on mount

  return (
    <div className='container'>
      <div className={`carousel state-${carouselState}`}>
        <img src={images[0].src} alt={images[0].alt} onClick={imageFunc1} />
        <img src={images[1].src} alt={images[1].alt} onClick={imageFunc2} />
        <img src={images[2].src} alt={images[3].alt} onClick={imageFunc3} />
        <img src={images[3].src} alt={images[4].alt} onClick={imageFunc4} />
        <img src={images[4].src} alt={images[4].alt} onClick={imageFunc5} />
        {!isHidden && (<div className='desc'> {images[carouselState-1].description} </div>)}
      </div>
      <div className='nav'>
        <img src='/assets/arrow_left.png' alt='Left' onClick={goLeft}></img>
        {Array.from({ length: 5 }).map((_, index) => (
          <img
            src={index === carouselState-1 ? '/assets/bar.png' : '/assets/dot.png'}
            alt='State'
          />
        ))}
        <img src='/assets/arrow_right.png' alt='Right' onClick={goRight}></img>
      </div>
    </div>
  );
};

export default ImageCarousel;

