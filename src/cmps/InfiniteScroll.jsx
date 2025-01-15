import { useState, useEffect } from 'react'
// import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { StayList } from './StayList'

export function InfiniteScrollCmp({ stays }) {
  
  const [displayedStays, setDisplayedStays] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDisplayedStays(stays.slice(0, 36)) // Initial batch
  }, [stays])

  // Function to fetch more stays
  const fetchMoreStays = () => {
    if (loading) return // Prevent fetching while loading
    setLoading(true)

    // Simulating a network request with a timeout
    setTimeout(() => {
      setDisplayedStays((prev) => [
        ...prev,
        ...stays.slice(prev.length, prev.length + 24), // Add more stays
      ]);
      setLoading(false); // Set loading to false when data is fetched
    }, 1000);
  };

  return (
    <InfiniteScroll
      dataLength={displayedStays.length}
      next={fetchMoreStays}
      hasMore={displayedStays.length < stays.length}
      loader={<h4>Loading...</h4>}
    >
      <StayList stays={displayedStays} />
    </InfiniteScroll>

  )
}
