import React from 'react';

import { storageService } from '../services/async-storage.service'
import { SearchBtn } from "./Search-btn.jsx"

export function SearchPreview({ staySearchParams, handlePreviewClick }) {
    const { location, checkIn, checkOut, guests = {} } = staySearchParams

    const locationContent = location || 'Anywhere'
    const dateContent =
        checkIn && checkOut
            ? `${storageService.formatDate(checkIn)} - ${storageService.formatDate(checkOut)}`
            : 'Any week'
    const guestsContent =
        guests.adults || guests.children
            ? `${guests.adults + guests.children} guests`
            : 'Add guests'

    return (
        <div className="search-preview">
            <button
                className="search-anywhere"
                onClick={() => handlePreviewClick('location')}
            >
                {locationContent}
            </button>

            <span className="splitter"></span>

            <button
                className="search-any-week"
                onClick={() => handlePreviewClick('dates')}
            >
                {dateContent}
            </button>

            <span className="splitter"></span>
            <button
                className="search-add-guests"
                onClick={() => handlePreviewClick('guests')}
            >
                {guestsContent}
            </button>
            <SearchBtn />
        </div>
    )
}

// Utility function to format the date

