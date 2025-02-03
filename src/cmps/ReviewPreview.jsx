
import { useRef } from 'react';
import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
    let pRef = useRef();
    const {imgUrl , fullname,_id,id} = review.by

    let isOverflow = review.txt.length>300;

    let isClicked = false;
    function showMoreHandler(event){
        isClicked = !isClicked;
        event.target.innerHTML = isClicked? "SHOW less" : "show More"
        pRef.current.style.height = isClicked? "auto" : "125px"
    }


    return (
        <article className="review-preview flex dirColumn gap10">
            <div className="review-header flex gap10 alCenter">
                <div className="review-img" ><img src={imgUrl || 'https://cdn-icons-png.flaticon.com/512/6858/6858485.png'} width="60px" height={60} alt={fullname} className="user-img"/></div>
                <div>
                    <div className="review-by"><Link to={`/user/${_id}`}>{fullname}</Link></div>
                    <div className="review-about">3 years on TripNgo</div>
                </div>
            </div>
            <p ref={pRef} className="review-txt overflowHidden hegith125" >"{review.txt}"</p>
            {
                isOverflow? 
                    <button className='btn-show-more' onClick={showMoreHandler}> Show more </button>
                :
                    <div></div>
            }
        </article>
    )
}
