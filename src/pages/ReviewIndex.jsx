import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  loadReviews,
  removeReview,
  getActionAddReview,
  getActionRemoveReview,
} from '../store/actions/review.actions'
import { loadUsers } from '../store/actions/user.actions'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import {
  socketService,
  SOCKET_EVENT_REVIEW_ADDED,
  SOCKET_EVENT_REVIEW_REMOVED,
} from '../services/socket.service'
import { ReviewList } from '../cmps/ReviewList'
import { ReviewEdit } from '../cmps/ReviewEdit'
import staysDataJson from '../../data/stays.json'
import StarIcon from '../assets/img/various/star.svg'

export function ReviewIndex({ stayId, stay }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  // const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  let [reviews, setReviews] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    let currentStay = staysDataJson.find((obj) => obj._id == stayId)
    setReviews(currentStay['reviews'])
    //loadReviews()
    loadUsers()

    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      console.log('GOT from socket', review)
      dispatch(getActionAddReview(review))
    })

    socketService.on(SOCKET_EVENT_REVIEW_REMOVED, (reviewId) => {
      console.log('GOT from socket', reviewId)
      dispatch(getActionRemoveReview(reviewId))
    })

    return () => {
      socketService.off(SOCKET_EVENT_REVIEW_ADDED)
      socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
    }
  }, [])

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  return (
    <div className='review-index'>
      <div className='reviews-title'>
        <img src={StarIcon} alt='star' width='18' height='18' />
        <h2>{`${stay.rate} · 6 reviews`}</h2>
      </div>

	  
      <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
    </div>
  )
}


//  {loggedInUser && <ReviewEdit />}