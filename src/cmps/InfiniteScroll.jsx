import React, { useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import stays from '../../src/store/stays.json'
import StarIcon from '../assets/img/various/star.svg'
import arrowLeft from '../assets/img/various/left-arrow.svg'
import arrowRight from '../assets/img/various/right-arrow.svg'


export function InfiniteScrollCmp(){

  const renderArrowPrev = (onClickHandler, hasPrev) => {
    return hasPrev ? (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow prev-arrow"
      >
        <img src={arrowLeft} alt="Previous" />
      </button>
    ) : null;
  };

  const renderArrowNext = (onClickHandler, hasNext) => {
    return hasNext ? (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow next-arrow"
      >
        <img src={arrowRight} alt="Next" />
      </button>
    ) : null;
  };

  const [displayedStays, setDisplayedStays] = useState(stays.slice(0, 36))

  const fetchMoreStays = () => {
    setTimeout(() => {
      setDisplayedStays((prev) => [
        ...prev,
        ...stays.slice(prev.length, prev.length + 24),
      ])
    }, 1000)
  }

  return (
    <InfiniteScroll
    dataLength={displayedStays.length}
    next={fetchMoreStays}
    hasMore={displayedStays.length < stays.length}
    loader={<h4>Loading...</h4>}
  >
  <section>
    <ul className='stay-list'>
      {displayedStays.map((stay) => (
        <article key={stay._id}   className='stay-preview'>
        <Carousel
        renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
        showArrows={true}
        showThumbs={false}
        infiniteLoop={false}
        dynamicHeight={false}
        emulateTouch={true}
        showStatus={false}
        className="stay-carousel"
      >
      {stay.imgUrls.map((imgUrl, idx) => (
        <div key={idx} className='image-container'>
          <img
            src={imgUrl}
            alt={`Image ${idx + 1}`}
            className="preview-img"
          />
        </div>
      ))}
    </Carousel>
        <div className='stay-card-details'>
          <div className='preview-header'>
            <div className='preview-name'>{stay.name}</div>
            <div className='preview-rating'>
              <img src={StarIcon} alt='star' width='10' height='10' />{' '}
              <span>5.0</span>
            </div>
          </div>
          <p className='preview-summary'>{stay.summary}</p>
          <p className='preview-dates'>July 17-19</p>
          <div className='preview-price'>
            <span className='price-number'>{stay.price}$</span>
            <span> night</span>
          </div>
        </div>
      </article>      ))}
      </ul>
      </section>
      </InfiniteScroll>
   
  )
}
