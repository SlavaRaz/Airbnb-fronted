import { httpService } from '../http.service'

export const reviewService = {
	add,
	query,
	remove,
}

// function query(filterBy) {
// 	var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
// 	return httpService.get(`review${queryStr}`)
// }
function query(filterBy) {
    var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
    return httpService.get(`/api/review${queryStr}`)
}

// async function remove(reviewId) {
// 	await httpService.delete(`review/${reviewId}`)
// }

// async function add({ txt, aboutUserId }) {
// 	return await httpService.post(`review`, { txt, aboutUserId })
// }

async function remove(reviewId) {
    await httpService.delete(`/api/review/${reviewId}`)
}

async function add({ txt, aboutUserId }) {
    return await httpService.post(`/api/review`, { txt, aboutUserId })
}
