import { useEffect, useState } from 'react'
import { CategorySvg } from './categorySvg'

export function Amenities({ stay }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 450)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dynamically set how many amenities to display
  const displayedAmenities = stay.amenities.slice(0, isMobile ? 7 : 10)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const removeSpaces = (str) => str.replace(/\s+/g, '')

  return (
    <section className='stay-amenities'>
      <h3 className='amenities-title'>What this place offers</h3>
      <div className='amenities-list'>
        {displayedAmenities.map((amenity, idx) => (
          <article key={idx + 1} className='amenity'>
            <div className='amenities-icon'>
              <div
                dangerouslySetInnerHTML={{
                  __html: CategorySvg[removeSpaces(amenity)],
                }}
              ></div>
            </div>
            <div className='amenities-text'>
              {capitalizeFirstLetter(amenity)}
            </div>
          </article>
        ))}
      </div>


    </section>
  )
}
