import { utilService } from '../services/util.service'

export function OrderDetails({ checkIn, checkOut, stay }) {

    const SERVICE_FEE = 11.2
    const totalStay = utilService.totalDays(checkIn, checkOut)
    const totalPriceBefore = stay.price * totalStay
    const serviceFee = Math.round(SERVICE_FEE * totalStay)
    const totalPriceAfter = totalPriceBefore + serviceFee

    return (
        <>
            <p className="no-charge-msg" style={{ textAlign: 'center' }}>You won't be charged yet</p>
            <div className="prices grid">
                <div>${(stay.price).toLocaleString()} x {totalStay} nights</div>
                <div>${totalPriceBefore.toLocaleString()}</div>
                <div>Airbnb Service fee</div>
                <div>${(Math.round(SERVICE_FEE * totalStay)).toLocaleString()}</div>
            </div>
            <div className="total flex justify-between">
            <div>Total</div>
            <div>${totalPriceAfter.toLocaleString()}</div>
            </div>
        </>
    )
}