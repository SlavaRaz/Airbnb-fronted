import { httpService } from '../http.service'


export const bookService = {
    query,
    save,
    remove,
    getById,
    // getEmptyBook,
    addBookMsg,
    removeBookMsg
}

async function query(filterBy = { txt:'' }) {
    return httpService.get(`book`, filterBy)
}

async function getById(bookId) {
    return await httpService.get(`book/${bookId}`)
}

async function remove(bookId) {
    console.log(bookId)
    return await httpService.delete(`book/${bookId}`)
}

async function save(book) {
    if (book._id) {
        return await httpService.put(`book/${book._id}`, book)
    } else {
        return await httpService.post(`book`, book)
    }
}

async function addBookMsg(bookId, msg) {
    return await httpService.post(`book/${bookId}/msg`, msg)
}

async function removeBookMsg(bookId, msgId) {
    return await httpService.delete(`book/${bookId}/msg/${msgId}`)
}






