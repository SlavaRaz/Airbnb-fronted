import React from 'react';
import { storageService } from '../services/async-storage.service'

export function SearchPreview({ staySearchParams, handlePreviewClick }) {

    const { location, checkIn, checkOut, guests } = staySearchParams

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
            <button className="search-btn">
                <section className="search-icon">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
                </section>
            </button>
        </div>
    )
}

