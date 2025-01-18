import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import StarIcon from '../assets/img/various/star.svg'
import arrowLeft from '../assets/img/various/left-arrow.svg'
import arrowRight from '../assets/img/various/right-arrow.svg'
import { stayService } from '../services/stay/stay.service.local'

export function InfiniteScrollCmp(props) {
  const [stays, setStays] = useState([])
  const [displayedStays, setDisplayedStays] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const filterBy = {
    location: searchParams.get('location') || '',
    guests: {
      adults: +searchParams.get('adults') || 0,
      children: +searchParams.get('children') || 0,
      infants: +searchParams.get('infants') || 0,
      pets: +searchParams.get('pets') || 0,
    },
  }
  
  useEffect(() => {
    const fetchStays = async () => {
      try {
        console.log('filterBy:', filterBy)
        const fetchedStays = await stayService.query(filterBy)
        setStays(fetchedStays)
        setDisplayedStays(fetchedStays.slice(0, 36))
      } catch (err) {
        console.error('Failed to fetch stays', err)
      }
    }

    fetchStays()
  }, [searchParams])

  const fetchMoreStays = () => {
    setTimeout(() => {
      setDisplayedStays((prev) => [
        ...prev,
        ...stays.slice(prev.length, prev.length + 24),
      ])
    }, 1000)
  }

  const renderArrowPrev = (onClickHandler, hasPrev) => {
    return hasPrev ? (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow prev-arrow"
      >
        <img src={arrowLeft} alt="Previous" />
      </button>
    ) : null
  }

  const renderArrowNext = (onClickHandler, hasNext) => {
    return hasNext ? (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow next-arrow"
      >
        <img src={arrowRight} alt="Next" />
      </button>
    ) : null
  }

  return (
    <InfiniteScroll
      dataLength={displayedStays.length}
      next={fetchMoreStays}
      hasMore={displayedStays.length < stays.length}
      loader={<h4>Loading...</h4>}
    >
      <section>
        <ul className="stay-list">
          {displayedStays.map((stay) => {
            let display = 'block'
            if (props.filters && stay.type !== props.filters) {
              display = 'none'
            }
            return (
              <article
                style={{ display: display }}
                className="stay-preview"
                key={stay._id}
              >
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
                    <div key={idx} className="image-container">
                      <img
                        src={imgUrl}
                        alt={`Image ${idx + 1}`}
                        className="preview-img"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="stay-card-details">
                  <div className="preview-header">
                    <div className="preview-name">{stay.name}</div>
                    <div className="preview-rating">
                      <img src={StarIcon} alt="star" width="10" height="10" />{' '}
                      <span>5.0</span>
                    </div>
                  </div>
                  <p className="preview-summary">{stay.summary}</p>
                  <p className="preview-dates">July 17-19</p>
                  <div className="preview-price">
                    <span className="price-number">{stay.price}$</span>
                    <span> night</span>
                  </div>
                </div>
              </article>
            )
          })}
        </ul>
      </section>
    </InfiniteScroll>
  )
}
