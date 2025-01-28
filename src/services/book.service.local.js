import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


export const bookService = {
    query,
    getById,
    remove,
    save,
    getEmptyBook,
}
const STORAGE_KEY = 'books'

_createBooks()

async function query(filterBy = {}) {
    let books = await storageService.query(STORAGE_KEY)
    if (filterBy.hostId) {
        books = books.filter((book) => book.hostId === filterBy.hostId)
    }
    if (filterBy.buyerId) {
        books = books.filter((book) => book.buyer._id === filterBy.buyerId)
    }
    return books
}

async function getById(bookId) {
    const stays = await storageService.get(STORAGE_KEY, bookId)
    return stays
}

async function remove(bookId) {
    return storageService.remove(STORAGE_KEY, bookId)
}

async function save(book) {
    if (book._id) {
        return storageService.put(STORAGE_KEY, book)
    } else {
        return storageService.post(STORAGE_KEY, book)
    }
}

function getEmptyBook(startDate = null,endDate = null,guests = { adults: 0, kids: 0, infants: 0, pets: 0 },stay = { _id: null, name: null }) {
    return {
        _id: null,
        hostId: null,
        hostName: null,
        buyer: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        startDate,
        endDate,
        guests,
        stay,
        msgs: [],
        status: 'pending',
    }
}

function _createdDemoBooks() {
    const DEMO_BOOKS = [
        {
            _id: 'b001',
            hostId: 'h123',
            hostName:'Ron Keller',
            buyer: {
                _id: 'u456',
                fullname: 'John Doe',
                imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            totalPrice: 1200,
            startDate: '2025-02-10',
            endDate: '2025-02-15',
            guests: {
                adults: 2,
                children: 2,
                infants: 1,
                pets: 0,
            },
            stay: {
                _id: 's789',
                name: 'Beachfront Villa',
                price: 200,
                address: '123 Ocean Drive, Malibu, CA',
                imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg',
            },
            msgs: [
                { sender: 'buyer', text: 'Can we check in early?', sentAt: '2025-02-01T10:00:00Z' },
                { sender: 'host', text: 'Sure, no problem!', sentAt: '2025-02-01T12:00:00Z' },
            ],
            status: 'confirmed',
        },
        {
            _id: 'b002',
            hostId: 'h456',
            hostName:'Ron Keller',
            buyer: {
                _id: 'u789',
                fullname: 'Jane Smith',
                imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            },
            totalPrice: 600,
            startDate: '2025-03-01',
            endDate: '2025-03-05',
            guests: {
                adults: 1,
                children: 0,
                infants: 0,
                pets: 0,
            },
            stay: {
                _id: 's101',
                name: 'Modern City Apartment',
                price: 150,
                address: '456 Downtown Blvd, New York, NY',
                imgUrl: 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg',
            },
            msgs: [
                { sender: 'buyer', text: 'Can you confirm WiFi speed?', sentAt: '2025-02-20T14:30:00Z' },
                { sender: 'host', text: 'It’s 300 Mbps!', sentAt: '2025-02-20T15:00:00Z' },
            ],
            status: 'pending',
        },

    ]
    utilService.saveToStorage(
        STORAGE_KEY,
        JSON.parse(JSON.stringify(DEMO_BOOKS))
    )
}

function _createBooks() {
    let books = utilService.loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        _createdDemoBooks()
    }
}
