import {StayGallery} from '../cmps/StayGallery'

export function StayDetails() {
 
  document.body.style.overflow = 'hidden'
  
  return (
    <section className='stay-details'>
       <StayGallery/>
    </section>
  )
}
