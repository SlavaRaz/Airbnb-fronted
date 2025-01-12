const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
    return {
        _id: '',
        price: getRandomIntInclusive(80, 240),
        name: '',
        msgs: [],
        location: '',
    }
}

function getDefaultFilter() {
    return {
        name: '',
        location: '',
        checkIn: '',            
        checkOut: '',
        guests: 0,
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
