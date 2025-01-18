
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import staysData from '../../../data/stays.json'

const STORAGE_KEY = 'stays'

// Initialize localStorage with JSON data if it's not already set
if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staysData))
}

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,

}
window.cs = stayService

async function query(filterBy = {}) {
    
    var stays = await storageService.query(STORAGE_KEY)
    const { location, checkIn, checkOut, guests } = filterBy

    const capacity = Object.values(guests).reduce((acc, val) => acc + val, 0)
  
    if (location) {
        stays = stays.filter(stay => stay.loc.country.toLowerCase().includes(filterBy.location.toLowerCase()))
    }
    if (checkIn && checkOut) {
        stays = stays.filter(stay => stay.availableDates.includes(checkIn) && stay.availableDates.includes(checkOut))
    }
    if (capacity) {
        stays = stays.filter(stay => stay.capacity >= capacity)
    }
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

// function getDefaultFilter() {
//     return {
//         txt: '',
//         minPrice: '',
//         sortField: '',
//         sortDir: '',
//     }
// }

// function getEmptyStay() {
//     return {
//         stay: makeId(),
//         price: getRandomIntInclusive(80, 240),
//         // speed: getRandomIntInclusive(80, 240),
//         msgs: [],
//     }
// }

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
            name: stay.name,
            location: stay.location,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            name: stay.name,
            price: stay.price,
            location: stay.location,
            // speed: stay.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}