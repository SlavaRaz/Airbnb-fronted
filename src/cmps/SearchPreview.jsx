import React from 'react';

import { storageService } from '../services/async-storage.service'
import { SearchBtn } from "./Search-btn.jsx"

export function SearchPreview({ staySearchParams, handlePreviewClick }) {
    const { location, checkIn, checkOut, guests = {} } = staySearchParams

    const locationContent = location || 'Anywhere'
    const dateContent =
        checkIn && checkOut
            ? `${storageService.formatDate(checkIn)} - ${storageServiceformatDate(checkOut)}`
            : 'Any week'
    const guestsContent =
        guests.adults || guests.children
            ? `${guests.adults + guests.children} guests`
            : 'Add guests'

    return (
        <div className="search-preview">
            <button
                className="search-preview__button"
                onClick={() => handlePreviewClick('location')}
            >
                {locationContent}
            </button>

            <span className="search-preview__divider"></span>

            <button
                className="search-preview__button"
                onClick={() => handlePreviewClick('dates')}
            >
                {dateContent}
            </button>

            <span className="search-preview__divider"></span>
            <button
                className="search-preview__button"
                onClick={() => handlePreviewClick('guests')}
            >
                {guestsContent}
            </button>
            <SearchBtn />
        </div>
    );
}

// Utility function to format the date

