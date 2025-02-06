import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsHeader } from '../cmps/DetailsHeader';
import { StayGallery } from '../cmps/StayGallery';
import { StayDescription } from '../cmps/StayDetailsDesc';
import '../assets/styles/basics/_layout-details.scss';
import { stayService } from '../services/stay/stay.service.local';
import { Loader } from '../cmps/Loader'; 
import { ReviewIndex } from './ReviewIndex.jsx';
import { PageFooter } from '../cmps/PageFooter'

import { StayMap } from '../cmps/StayMap.jsx'

export function StayDetails() {
  const { stayId } = useParams();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStay() {
      const fetchedStay = await stayService.getById(stayId);
      setStay(fetchedStay);
      setLoading(false);
    }
    fetchStay();
  }, [stayId]);

  if (loading) {
    return <Loader />
  }

  return (
    <section className="StayDetailsComponent main container full">
     <DetailsHeader />
      <StayGallery stay={stay} />
      <StayDescription stay={stay} />
      <ReviewIndex stayId={stayId} stay={stay}/>
      <div className="stay-map-container">
        <div className='stay-map'>
                    <h1>Where you'll be</h1>
                    <StayMap stay={stay} />
                    <h3 className='stay-location-name'>
                      {stay.loc.country}, {stay.loc.city}
                    </h3>
                    <p>
                      Blue Ridge Mountains, Asheville, North Carolina, USA
                      Nestled in the heart of the picturesque Blue Ridge Mountains,
                      our retreat offers a serene escape surrounded by lush forests and breathtaking vistas.
                      The property is located within a protected area known for its rich biodiversity and stunning natural beauty.
        
                    </p>
                  </div>
                  </div>
                  <PageFooter/>
    </section>
  )
}
