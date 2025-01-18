import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { StayPreview } from '../cmps/StayPreview'
import { stayService } from '../services/stay/stay.service.local'

export function StayList() {
  const [stays, setStays] = useState([])
  const [displayedStays, setDisplayedStays] = useState([])

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const fetchedStays = await stayService.query()
        setStays(fetchedStays)
        setDisplayedStays(fetchedStays.slice(0, 36))
      } catch (err) {
        console.error('Failed to fetch stays', err)
      }
    }

    fetchStays()
  }, [])

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
            <StayPreview key={stay._id} stay={stay}/>
          ))}
        </ul>
      </section>
    </InfiniteScroll>
  )
}
