import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MyImage = ({ image }) => (
  
    <LazyLoadImage
      height={image.height}
      src={image.src} // use normal <img> attributes as props
      effect="blur"
      width={image.width} />
      
   
  
);

export default MyImage;