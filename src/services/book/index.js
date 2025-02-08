const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { bookService as local } from './book.service.local'
import { bookService as remote } from './book.service.remote'

function getEmptyBook(
    startDate = null,
    endDate = null,
    guests = { adults: 0, children: 0, infants: 0, pets: 0 },
    stay = { _id: null, name: null }
) {
    return {
        "_id": "null",
        "hostId": "null",
        "hostName": "null",
        "user": {
            "_id": '',
            "fullname": '',
            "imgUrl": '',
        },
        "totalPrice": '',
        "startDate":'',
        "endDate":'',
        "guests": {
            "adults": "null",
            "children": "null",
            "infants": "null",
            "pets": "null",
        },
        "stay": {
            "_id": '',
            "name": '',
            "price": "null",
            "country": '',
            "city": '',
            "address": '',
            "imgUrl":
                'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg',
        },
        "msgs": "[]",
        "status": "pending",
    }
}


const service = VITE_LOCAL === 'true' ? local : remote
export const bookService = { getEmptyBook, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.bookService = bookService
