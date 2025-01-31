import { reviewService } from '../../services/review'

import { store } from '../store'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from '../reducers/review.reducer'
import { SET_SCORE } from '../reducers/user.reducer'

import dataRviesJson from "../../../data/stays.json"

// export async function loadReviews() {
// 	try {
// 		const reviews = await reviewService.query()
// 		store.dispatch({ type: SET_REVIEWS, reviews })
// 	} catch (err) {
// 		console.log('ReviewActions: err in loadReviews', err)
// 		throw err
// 	}
// }
export async function loadReviews() {
    try {
        // console.log('🔍 Fetching reviews from local storage...');
        // const reviews = await reviewService.query();
        // console.log('✅ Reviews fetched:', reviews);
        // store.dispatch({ type: SET_REVIEWS, reviews });
		console.log("dataRviesJson",dataRviesJson);
		
        //store.dispatch({ type: SET_REVIEWS, dataRviesJson });
    } catch (err) {
        console.log('❌ Error fetching reviews:', err);
    }
}



export async function addReview(review) {
	try {
		const addedReview = await reviewService.add(review)
		store.dispatch(getActionAddReview(addedReview))
		const { score } = addedReview.byUser
		store.dispatch({ type: SET_SCORE, score })
	} catch (err) {
		console.log('ReviewActions: err in addReview', err)
		throw err
	}
}

export async function removeReview(reviewId) {
	try {
		await reviewService.remove(reviewId)
		store.dispatch(getActionRemoveReview(reviewId))
	} catch (err) {
		console.log('ReviewActions: err in removeReview', err)
		throw err
	}
}
// Command Creators
export function getActionRemoveReview(reviewId) {
	return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
	return { type: ADD_REVIEW, review }
}
