import stays from '../../src/store/stays.json'
import StarIcon from '../assets/img/various/star.svg'
import React, { useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export function InfiniteScrollCmp(props){
  const [displayedStays, setDisplayedStays] = useState(stays)

  const fetchMoreStays = () => {
    setTimeout(() => {
      setDisplayedStays((prev) => [
        ...prev,
        ...stays.slice(prev.length, prev.length + 24),
      ])
    }, 1000)
  }

  return (
    // <InfiniteScroll
    //   dataLength={displayedStays.length}
    //   next={fetchMoreStays}
    //   hasMore={displayedStays.length < stays.length}
    //   loader={<h4>Loading...</h4>}
    // >
        <section>
          <ul className='stay-list'>
            {displayedStays.map((stay) => {
              let display = "block";
              if(props.filters!="" && stay.type != props.filters){
                display="none";
              }
              return(
                <article style={{display:display}} className='stay-preview' key={stay._id}>
                <img className='preview-img' src={stay.imgUrls[0]} />
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
              </article>     
            )})}
            </ul>
            </section>
    // </InfiniteScroll>
  )
}
