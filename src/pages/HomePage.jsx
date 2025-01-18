import { useState } from 'react'
import FilterMenu from '../cmps/FilterMenu/FilterMenu'
import {InfiniteScrollCmp} from '../cmps/InfiniteScroll'
// import Filt

export function HomePage() {
    let [fileters , setFilters]= useState("")

    return (
        <section>
            <FilterMenu setFilters = {setFilters} />
            {/* <h1>Home sweet Home</h1> */}
            <InfiniteScrollCmp filters={fileters}/>
        </section>
    )
}


