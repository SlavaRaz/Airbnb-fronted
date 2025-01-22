import {StayGallery} from '../cmps/StayGallery'
import {StayDescription} from '../cmps/StayDetailsDesc'


export function StayDetails() {
 
  document.body.style.overflow = 'hidden'
  
  return (
    <section className='stay-details '>
       <StayGallery/>
       <StayDescription/>
       
    </section>
  )
}
