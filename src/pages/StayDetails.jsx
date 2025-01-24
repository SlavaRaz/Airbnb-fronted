import { StayGallery } from '../cmps/StayGallery'
import { StayDescription } from '../cmps/StayDetailsDesc'
import '../assets/styles/basics/_layout-details.scss'


export function StayDetails() {

  return (
    <section className='StayDetailsComponent full main-container '>
      <StayGallery />
      <StayDescription />

    </section>

  )
}
