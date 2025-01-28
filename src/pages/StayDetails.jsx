import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsHeader } from '../cmps/DetailsHeader';
import { StayGallery } from '../cmps/StayGallery';
import { StayDescription } from '../cmps/StayDetailsDesc';
import '../assets/styles/basics/_layout-details.scss';
import { stayService } from '../services/stay/stay.service.local';
import { Loader } from '../cmps/Loader'; 

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
    return <Loader />;
  }

  return (
    <section className="StayDetailsComponent main container full">
     <DetailsHeader />
      <StayGallery stay={stay} />
      <StayDescription stay={stay} />
    </section>
  )
}
