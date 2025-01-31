import { storageService } from '../async-storage.service'
import { userService } from '../user'

export const reviewService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	return storageService.query('review')
}

async function remove(reviewId) {
	await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {
	const aboutUser = await userService.getById(aboutUserId)
	const reviewToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		aboutUser: {
			_id: aboutUser._id,
			fullname: aboutUser.fullname,
			imgUrl: aboutUser.imgUrl,
		},
	}

	reviewToAdd.byUser.score += 10
	await userService.update(reviewToAdd.byUser)

	const addedReview = await storageService.post('review', reviewToAdd)
	return addedReview
}




async function _createDemoReviews() {
    const demoReviews = [
        {
            _id: 'r101',
            txt: 'Amazing place! Highly recommended!',
            byUser: { _id: 'u101', fullname: 'John Doe' },
            aboutUser: { _id: 'u102', fullname: 'Airbnb Host' },
        },
        {
            _id: 'r102',
            txt: 'The stay was comfortable, but the WiFi was slow.',
            byUser: { _id: 'u103', fullname: 'Jane Smith' },
            aboutUser: { _id: 'u102', fullname: 'Airbnb Host' },
        },
    ]
    
    for (const review of demoReviews) {
        await storageService.post('review', review) // משתמשים בפוסט לכל ביקורת
    }
}

// _createDemoReviews();

