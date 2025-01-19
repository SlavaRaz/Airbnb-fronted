import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStays, addStay, updateStay, removeStay, addStayMsg } from '../store/actions/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { userService } from '../services/user'
import { useSearchParams } from 'react-router-dom'

import { StayList } from '../cmps/StayList'
import { StayFilter } from '../cmps/StayFilter'

export function StayIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

    const filterBy = {
        location: searchParams.get('location')
    }

    useEffect(() => {
        loadStays(filterBy)
    }, [searchParams])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.name = prompt('Name?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const speed = +prompt('New speed?', stay.speed)
        if (speed === 0 || speed === stay.speed) return

        const stayToSave = { ...stay, speed }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new speed: ${savedStay.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    return (
        <main className="stay-index">
            <header>
                <h2>Stays</h2>
                {userService.getLoggedinUser() && <button onClick={onAddStay}>Add a Stay</button>}
            </header>
            {/* <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            {isLoading && <StayList stays={stays}
                onRemoveStay={onRemoveStay}
                onUpdateStay={onUpdateStay} />}

        </main>
    )
}