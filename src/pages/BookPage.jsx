import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import arrowLeftImg from '../assets/img/various/arrow-left.svg'

import { utilService } from '../services/util.service'
import { loadStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { bookService } from '../services/book.service.local'
import { AppHeaderBook } from '../cmps/AppHeaderBook.jsx'


export function BookPage() {
    const [stayToBook, setStayToBook] = useState(bookService.getEmptyBook())
    const [isBooked, setIsBooked] = useState(false)
    const { stayId } = useParams()

    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)

    useEffect(() => {
        if (stayId) loadStay()
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            const bookingRequest = handleBookingRequest(stay)
            setStayToBook({ ...bookingRequest })
        } catch (err) {
            console.log('Cannot load stay details', err)
            navigate('/')
        }
    }

    function handleBookingRequest(stay) {
        const SERVICE_FEE = 11.2

        const startDate = +params.get('checkIn')
        const endDate = +params.get('checkOut')
        const totalBookDays = utilService.totalDays(startDate, endDate)

        return {
            startDate,
            endDate,
            totalBookDays,
            guests: {
                adults: +params.get('adults') || 1,
                children: +params.get('children') || 0,
                infants: +params.get('infants') || 0,
                pets: +params.get('pets') || 0,
            },
            totalStayPrice: +(stay.price * totalBookDays),
            totalFees: +(SERVICE_FEE * totalBookDays),
            totalPriceWithFees: +(stay.price * totalBookDays + SERVICE_FEE * totalBookDays),
            hostId: stay.hostId,
        }
    }

    async function saveBookingRequest(ev) {
        ev.preventDefault()
        try {
            await bookService.save(stayToBook)
            showSuccessMsg('Book Saved!')
            setIsBooked(true)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot save book')
        }
    }

    function getGuestsSubHeading() {
        const { adults, children, infants, pets } = orderParams.guests
        const parts = [
            adults && `${adults} ${adults > 1 ? 'adults' : 'adult'}`,
            children && `${children} ${children > 1 ? 'children' : 'child'}`,
            infants && `${infants} ${infants > 1 ? 'infants' : 'infant'}`,
            pets && `${pets} ${pets > 1 ? 'pets' : 'pet'}`,
        ].filter(Boolean)

        if (!parts.length) return 'Add Guests'
        if (parts.length === 1 && parts[0] === '1 adult') return '1 guest'
        return parts.join(', ')
    }

    function onGoBack() {
        navigate(-1)
    }
    return (
        <div>
            <header className='app-header main-layout booking-header'>
                <div className='header-logo-container'>
                    <AppHeaderBook />
                </div>
            </header>
            <section className='main-layout '>
                <header className='booking-title flex'>
                    <div className='icon-svg'>
                        <img
                            src={arrowLeftImg}
                            className='arrow-img'
                            alt='arrowLeftImg'
                            onClick={onGoBack}
                        />
                    </div>
                    <div>
                        {!isBooked && <h2>Request to book</h2>}
                        {/* {isBooked && (
                            <div className='success-title flex'>
                                <img
                                    src={greenCheck}
                                    className='icon-svg greenCheck-img'
                                    alt='greenCheckImg'
                                />
                                <h2>Reservation success!</h2>
                            </div>
                        )} */}
                    </div>
                </header>
            </section>
        </div>
    )
}