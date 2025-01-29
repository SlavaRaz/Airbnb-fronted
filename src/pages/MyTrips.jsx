import React, { useEffect, useState } from 'react';
import { bookService } from '../services/book.service.local';
import { MyTripsHeader } from '../cmps/MyTripsHeader';
import { TripsTable } from '../cmps/TripsTable';
import { Loader } from '../cmps/Loader';

export function MyTrips() {
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTrips();
  }, []);


  async function loadTrips() {
    try {
      const tripsData = await bookService.query()
      setTrips(tripsData)
    } catch (err) {
      console.error('Failed to load trips:', err);
    } finally {
      setIsLoading(false);
    }
  }

 
  async function onCancel(tripId) {
    try {
      const tripToUpdate = trips.find((trip) => trip._id === tripId);
      if (!tripToUpdate) throw new Error('Trip not found');

      const updatedTrip = { ...tripToUpdate, status: 'canceled' };

      
      await bookService.save(updatedTrip);

   
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === tripId ? updatedTrip : trip
        )
      );
    } catch (err) {
      console.error('Failed to cancel trip:', err);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="my-trips-container">
        <MyTripsHeader />
        <h1 className="greeting-user">Welcome Back, Muki Guest</h1>
        <h2 className="title-my-trips">Your Trips</h2>
        <TripsTable trips={trips} onCancel={onCancel} />
      </div>
    </section>
  );
}
