import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailsHeader } from '../cmps/DetailsHeader'
import { StayGallery } from '../cmps/StayGallery'
import { StayDescription } from '../cmps/StayDetailsDesc'
import '../assets/styles/basics/_layout-details.scss'
import { stayService } from '../services/stay'
import { Loader } from '../cmps/Loader'
import { ReviewIndex } from './ReviewIndex.jsx'
import { StayMap } from '../cmps/StayMap'
import { PageFooter } from '../cmps/PageFooter'

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStay() {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)
      setLoading(false)
    }
    fetchStay()
  }, [stayId])

  if (loading) {
    return <Loader />
  }

  return (
    <section className='StayDetailsComponent main container full'>
      <DetailsHeader />
      <StayGallery stay={stay} />
      <StayDescription stay={stay} />
      <div className='reviews-and-map'>
        <ReviewIndex stayId={stayId} stay={stay} />

        <div className='divider-map'></div>


        <div className='stay-map'>
          <h1>Where you'll be</h1>
          <h3 className='stay-location-name'>
            {stay.loc.country}, {stay.loc.city}
          </h3>
          <div className='map-container'>
            <StayMap stay={stay} />
          </div>
        </div>
      </div>

      <PageFooter />
    </section>
  )
}
