import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import arrowLeftImg from '../assets/img/various/arrow-left.svg'
import greenCheck from '../assets/img/various/greenCheck.svg'
import rareDiamond from '../assets/img/various/rare-diamond.svg'
import { BtnSquareColor } from '../cmps/ui/buttons/btn-square-color.jsx'
import { FaStar } from 'react-icons/fa'

import { utilService } from '../services/util.service'
import { loadStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { bookService } from '../services/book.service.local'
import { AppHeaderBook } from '../cmps/AppHeaderBook.jsx'
import { LoginSignup } from '../cmps/login-signup'


export function BookPage() {
    const [stayToBook, setStayToBook] = useState(bookService.getEmptyBook())
    const [isBooked, setIsBooked] = useState(false)
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const user = useSelector((state) => state.userModule.user)

    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)

    useEffect(() => {
        if (stayId) loadStay()
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            console.log(stay)
            setStay(stay)
            const bookingRequest = handleBookingRequest(stay)
            console.log(bookingRequest)
            setStayToBook(bookingRequest)
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
        const status = 'pending'

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
            status,
        }
    }

    async function saveBookingRequest() {
        console.log(stayToBook)
        try {
            await bookService.save(stayToBook)
            // showSuccessMsg('Book Saved!')
            setIsBooked(true)
            // navigate('/')
        } catch (err) {
            showErrorMsg('Cannot save book')
        }
    }

    function getGuestsSubHeading() {
        const { adults, children, infants, pets } = stayToBook.guests
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

    function onGoToTrip() {
        navigate('/trip')
    }

    console.log('stay', stay)
    console.log('stayToBook', stayToBook)
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
                        {isBooked && (
                            <div className='success-title flex'>
                                <div className='icon-svg'>
                                    <img
                                        src={greenCheck}
                                        className='icon-svg greencheck-img'
                                        alt='greenCheckImg'
                                    />
                                </div>
                                <h2>Reservation success!</h2>
                            </div>
                        )}
                    </div>
                </header>
                <main className='book-content flex justify-between'>
                    <section className='book-details'>
                        {stay && (
                            <div className='rare-find flex justify-between'>
                                <div>
                                    <h4>This is a rare find</h4>
                                    <h5 className='rare-host'>
                                        {stay.host.fullname}'s place is usually booked.
                                    </h5>
                                </div>
                                <img
                                    src={rareDiamond}
                                    className='diamond-img'
                                    alt='arrowLeftImg'
                                />
                            </div>
                        )}
                        <div className='trip-details'>
                            <h3 className='your-trip'>Your trip</h3>
                            <div className='grid '>
                                <h4 className='trip-subheader'>Dates</h4>
                                <div className='trip-details-data'>
                                    {utilService.formattedDate(stayToBook.startDate)} -{' '}
                                    {utilService.formattedDate(stayToBook.endDate)}
                                </div>
                                <h4 className='trip-subheader'>Guests</h4>
                                <div className='trip-details-data'>{getGuestsSubHeading()}</div>
                            </div>
                        </div>

                        <div className='book-user'>
                            {!isBooked && (
                                <>
                                    {user ? (
                                        <BtnSquareColor onClick={saveBookingRequest}>
                                            Confirm
                                        </BtnSquareColor>
                                    ) : (
                                        <div>
                                            <h3 className='login-msg'></h3>
                                            <LoginSignup />
                                        </div>
                                    )}
                                </>
                            )}
                            {isBooked && (
                                <>
                                    <h3 className='success-msg'>
                                        Looking forward to hosting you!
                                    </h3>
                                    {user && (
                                        <BtnSquareColor onClick={onGoToTrip}>
                                            Review Trips
                                        </BtnSquareColor>
                                    )}
                                    <div className='success-txt flex'>
                                        <div className='icon-svg'>
                                            <img
                                                src={greenCheck}
                                                className='greenCheck-img'
                                                alt='greenCheckImg'
                                            />
                                        </div>
                                        <h4 className='res-success-txt'>Reservation success!</h4>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                    <section className='book-card'>
                        {stay && (
                            <div className='stay-details flex border-buttom'>
                                <img
                                    className='stay-img'
                                    src={stay.imgUrls[0]}
                                    alt='staypreview'
                                />
                                <div className='stay-desc flex justify-between'>
                                    <div>
                                        <h4 className='stay-type'>{stay.type}</h4>
                                        <h4 className='stay-name'>{stay.name}</h4>
                                    </div>

                                    <div className='rating-review flex'>
                                        <span className="avg-star"> <FaStar /></span>
                                        <span className='avg-rating'>
                                            {stay?.reviews?.avgRating ? stay.reviews.avgRating : 'No rating available'}
                                        </span>
                                        <span className='reviews'>
                                            ({stay.reviews.length}
                                            <span className='avg-rating-reviews'> reviews</span>)
                                        </span>
                                        <span className='avg-rating-seperator'>•</span>
                                        <span className='super-host avg-rating'>Superhost</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {stay && (
                            <div className='price-details'>
                                <h3 className='price-details-header'>Price details</h3>
                                <div className='cost-container flex'>
                                    <div className='cost-details flex '>
                                        <div className='base-cost flex justify-between'>
                                            <span className='cost-calc'>
                                                ${stay.price.toLocaleString()} x {stayToBook.totalBookDays} nights
                                            </span>
                                            <span>$ {stayToBook.totalStayPrice.toLocaleString()}</span>
                                        </div>
                                        <div className='base-cost service flex justify-between'>
                                            <span className='cost-calc'>Service fee</span>
                                            <span>${stayToBook.totalFees.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className='total-details'>
                                        <div className='total-cost flex justify-between'>
                                            <span>
                                                Total{' '}
                                                <span style={{ textDecoration: 'underline' }}>(USD)</span>
                                            </span>
                                            <span>${stayToBook.totalPriceWithFees.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </section>
        </div>
    )
}