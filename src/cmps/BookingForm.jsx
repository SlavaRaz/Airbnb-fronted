import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { utilService } from '../services/util.service';

export function BookingForm() {

    const [searchParams] = useSearchParams();

    const [formState, setFormState] = useState({
        location: searchParams.get('location') || '',
        checkIn: +searchParams.get('checkIn') || '',
        checkOut: +searchParams.get('checkOut') || '',
        guests: {
            adults: +searchParams.get('adults') || 1,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        },
    });
    
    return (
        <div className='booking-form'>
            <form>
                <div className='form-group'>
                    <label htmlFor='check-in'>Check In</label>
                    <input type='date' id='check-in' name='check-in' />
                </div>
                <div className='form-group'>
                    <label htmlFor='check-out'>Check Out</label>
                    <input type='date' id='check-out' name='check-out' />
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input type='number' id='guests' name='guests' />
                </div>
                <button>Reserve</button>
            </form>
        </div>
    )


}