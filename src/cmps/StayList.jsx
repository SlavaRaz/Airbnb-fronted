import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { StayPreview } from '../cmps/StayPreview'
import { stayService } from '../services/stay/'

export function StayList({ filters }) {
  const [stays, setStays] = useState([])
  const [displayedStays, setDisplayedStays] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const filterBy = {
    location: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn')
      ? new Date(+searchParams.get('checkIn'))
      : '',
    checkOut: searchParams.get('checkOut')
      ? new Date(+searchParams.get('checkOut'))
      : '',
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


  return (
    <InfiniteScroll
      className='main-stays'
      dataLength={displayedStays.length}
      next={fetchMoreStays}
      hasMore={displayedStays.length < stays.length}
      loader={<h4>Loading...</h4>}
    >
      <section>
        <ul className='stay-list'>
          {displayedStays.map((stay) => (
            <StayPreview key={stay._id} stay={stay} filters={filters} />
          ))}
        </ul>
      </section>
    </InfiniteScroll>
  )
}
