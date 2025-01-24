import { useState } from 'react'
import FilterMenu from '../cmps/FilterMenu/FilterMenu'
import {StayList} from '../cmps/StayList'
import { AppFooter } from '../cmps/AppFooter'

// import Filt

export function HomePage() {
    let [filters , setFilters]= useState("")

    return (
        <section>
            {console.log(filters) }
            <FilterMenu setFilters = {setFilters} />
            <StayList filters={filters}/>
            <AppFooter />

        </section>
    )
}


