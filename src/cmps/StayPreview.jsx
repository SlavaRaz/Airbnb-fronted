import { Link } from 'react-router-dom'
import StarIcon from '../assets/img/various/star.svg'

export function StayPreview({ stay }) {
    console.log('stay:', stay)
    return <article className='stay-preview' key={stay._id}>
        <header>
            <Link to={`/${stay._id}`} style={{ textDecoration: 'none' }}>

                <img className='preview-img' src={stay.imgUrls[0]} />
                <div className='stay-card-details'>
                    <div className='preview-header'>
                        <div className='preview-name'>{stay.name}</div>
                        <div className='preview-rating'>
                            <img src={StarIcon} alt='star' width='10' height='10' />{' '}
                            <span>5.0</span>
                        </div>
                    </div>
                    <p className='preview-summary'>{stay.summary}</p>
                    <p className='preview-dates'>July 17-19</p>
                    <div className='preview-price'>
                        <span className='price-number'>{stay.price}$</span>
                        <span> night</span>
                    </div>
                </div>
            </Link>
        </header>
    </article>
}