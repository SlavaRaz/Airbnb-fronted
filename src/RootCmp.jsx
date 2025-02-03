import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs';
import { StayIndex } from './pages/StayIndex.jsx';
import { ReviewIndex } from './pages/ReviewIndex.jsx';
import { ChatApp } from './pages/Chat.jsx';
import { AdminIndex } from './pages/AdminIndex.jsx';
import { StayDetails } from './pages/StayDetails.jsx';
import { UserDetails } from './pages/UserDetails.jsx';
import { MyTrips } from './pages/MyTrips.jsx';
import { MyListings } from './pages/MyListings.jsx';
import { AppFooter } from './cmps/AppFooter';
import { UserMsg } from './cmps/UserMsg.jsx';
import { BookPage } from './pages/BookPage.jsx';

export function RootCmp() {
    const location = useLocation();

    useEffect(() => {
        let pageTitle = "TripNGo"; // כותרת ברירת מחדל

        if (location.pathname.includes("/stay/")) {
            pageTitle = "TripNGo - Stay Details";
        } else if (location.pathname.includes("/mytrips")) {
            pageTitle = "TripNGo - My Trips";
        } else if (location.pathname.includes("/mylistings")) {
            pageTitle = "TripNGo - My Listings";
        } else if (location.pathname.includes("/book/stay/")) {
            pageTitle = "TripNGo - Booking";
        } else if (location.pathname.includes("/user/")) {
            pageTitle = "TripNGo - User Profile";
        } else if (location.pathname.includes("/review")) {
            pageTitle = "TripNGo - Reviews";
        } else if (location.pathname.includes("/chat")) {
            pageTitle = "TripNGo - Chat";
        } else if (location.pathname.includes("/admin")) {
            pageTitle = "TripNGo - Admin Panel";
        } else if (location.pathname.includes("/about")) {
            pageTitle = "TripNGo - About Us";
        }

        document.title = pageTitle;
    }, [location]);

    return (
        <div className="main-container">
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="stay/:stayId" element={<StayDetails />} />
                    <Route path="mytrips" element={<MyTrips />} /> 
                    <Route path="mylistings" element={<MyListings />} /> 
                    <Route path="book/stay/:stayId" element={<BookPage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                </Routes>
            </main>
        </div>
    );
}
