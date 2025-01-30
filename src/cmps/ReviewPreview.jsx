// import { Link } from 'react-router-dom'

// export function ReviewPreview({ review }) {
//     const { byUser, aboutUser } = review

//     return <article className="preview review-preview">
//         <p>About: <Link to={`/user/${aboutUser._id}`}>{aboutUser.fullname}</Link></p>
//         <p className="review-by">By: <Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link></p>
//         <p className="review-txt">{review.txt}</p>
//     </article>
// }

import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
    const { byUser, aboutUser } = review

    return (
        <article className="review-preview">
            <div className="review-header">
                <img src={byUser.imgUrl || 'https://via.placeholder.com/50'} alt={byUser.fullname} className="user-img"/>
                <div>
                    <p className="review-by"><Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link></p>
                    <p className="review-about">על: <Link to={`/user/${aboutUser._id}`}>{aboutUser.fullname}</Link></p>
                </div>
            </div>
            <p className="review-txt">"{review.txt}"</p>
        </article>
    )
}
