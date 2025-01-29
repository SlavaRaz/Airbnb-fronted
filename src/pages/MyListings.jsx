import React, { useEffect, useState } from 'react';
import { bookService } from '../services/book.service.local';
import { MyListingsTable } from '../cmps/MyListingsTable';
import { Loader } from '../cmps/Loader';
import { MyListingsHeader } from '../cmps/MyListingsHeader';


export function MyListings() {
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

 
  async function onAccept(tripId) {
    try {
      const tripToUpdate = trips.find((trip) => trip._id === tripId)
      if (!tripToUpdate) throw new Error('Trip not found')

      const updatedTrip = { ...tripToUpdate, status: 'approved' }

      
      await bookService.save(updatedTrip)

   
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip._id === tripId ? updatedTrip : trip
        )
      );
    } catch (err) {
      console.error('Failed to cancel trip:', err)
    }
  }

  async function onReject(tripId) {
    try {
      const tripToUpdate = trips.find((trip) => trip._id === tripId)
      if (!tripToUpdate) throw new Error('Trip not found')

      const updatedTrip = { ...tripToUpdate, status: 'rejected' }

      
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
      <div className="my-listings-container">
        <MyListingsHeader />
        <h1 className="greeting-user">Welcome Back, Muki Guest</h1>
        <h2 className="title-my-trips">My Listings</h2>
        <MyListingsTable trips={trips} onAccept={onAccept} onReject={onReject}/>
      </div>
    </section>
  );
}
