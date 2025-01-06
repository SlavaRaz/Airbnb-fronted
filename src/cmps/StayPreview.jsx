import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return <article className="preview">
        <header>
            <Link to={`/stay/${stay._id}`}>{stay.vendor}</Link>
        </header>

        <p>Price: <span>{stay.price} $</span></p>
        {stay.name && <p>Name: <span>{stay.name}</span></p>}
        
    </article>
}