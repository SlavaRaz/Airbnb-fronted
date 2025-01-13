import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css' // Core Swiper styles
import 'swiper/css/navigation' // Navigation styles
import 'swiper/css/pagination' // Pagination styles
// import { Navigation, Pagination } from 'swiper'

// const StayGallery = ({ images }) => {
//     return (
//       <Swiper
//         modules={[Navigation, Pagination]} // Use navigation and pagination modules
//         spaceBetween={10}  // Space between images
//         slidesPerView={1}  // Show 1 image at a time
//         navigation          // Show next/prev arrows
//         pagination={{ clickable: true }} // Pagination dots
//         loop={true}         // Loop through images
//         autoplay={{
//           delay: 3000,      // Autoplay interval (3 seconds)
//           disableOnInteraction: false, // Continue autoplay after user interaction
//         }}
//       >
//         {images.map((imgUrl, index) => (
//           <SwiperSlide key={index}>
//           <img className='preview-img' src={imgUrl} style={{ width: '100%', height: 'auto' }}/>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     );
//   };

//   export default StayGallery;

export function StayGallery({images}) {
  
    return images.map((imgUrl, index) => (
      <SwiperSlide key={index}>
        <img
          className='preview-img'
          src={imgUrl}
        />
      </SwiperSlide>
    ))
  
}
