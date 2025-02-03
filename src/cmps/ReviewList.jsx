// import { userService } from '../services/user'

// import { ReviewPreview } from './ReviewPreview.jsx'

// export function ReviewList({ reviews, onRemoveReview }) {
    
//     function shouldShowActionBtns(review) {
//         const user = userService.getLoggedinUser()
        
//         if (!user) return false
//         if (user.isAdmin) return true
//         return review.byUser?._id === user._id
//     }

//     return <section>
//         <ul className="list review-list">
//             {reviews.map(review =>
//                 <li key={review._id}>
//                     <ReviewPreview review={review}/>
//                     {shouldShowActionBtns(review) && <div className="actions">
//                         <button onClick={() => onRemoveReview(review._id)}>x</button>
//                     </div>}
//                 </li>)
//             }
//         </ul>
//     </section>
// }


import { userService } from '../services/user'
import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    return (
        <section className="review-list-container">
            <ul className="review-list">
                {reviews.slice(0, 6).map(review => (
                    <li key={review._id} className="review-item">
                        <ReviewPreview review={review}/>
                        {userService.getLoggedinUser()?.isAdmin && (
                            <button onClick={() => onRemoveReview(review._id)}></button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
