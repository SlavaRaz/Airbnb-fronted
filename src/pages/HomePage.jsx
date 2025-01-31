import { useState } from 'react'
import { AppHeader } from '../cmps/AppHeader'
import FilterMenu from '../cmps/FilterMenu/FilterMenu'
import { StayList } from '../cmps/StayList'
import { AppFooter } from '../cmps/AppFooter'

// import Filt

export function HomePage() {
  let [filters, setFilters] = useState('')

  return (
    <section>
      <AppHeader />
      {console.log(filters)}
      <FilterMenu setFilters={setFilters} />
      <StayList filters={filters} />
      <AppFooter />
    </section>
  )
}

