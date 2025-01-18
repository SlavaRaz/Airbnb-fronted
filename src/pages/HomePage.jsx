import { useState } from 'react'
import FilterMenu from '../cmps/FilterMenu/FilterMenu'
import {StayList} from '../cmps/StayList'
// import Filt

export function HomePage() {
    let [filters , setFilters]= useState("")

    return (
        <section>
            <FilterMenu setFilters = {setFilters} />
            <StayList filters={filters}/>
        </section>
    )
}


