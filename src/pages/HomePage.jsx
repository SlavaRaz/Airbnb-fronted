import { useState } from 'react'
import FilterMenu from '../cmps/FilterMenu/FilterMenu'
import {StayList} from '../cmps/StayList'
// import Filt

export function HomePage() {
    let [fileters , setFilters]= useState("")

    return (
        <section>
            {console.log(fileters)}
            <FilterMenu setFilters = {setFilters} />
            {/* <h1>Home sweet Home</h1> */}
            <StayList filters={fileters}/>
        </section>
    )
}


