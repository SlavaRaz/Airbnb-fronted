

function handleSearch() {
    const query = new URLSearchParams({
        location: staySearchParams.location,
        checkIn: staySearchParams.checkIn,
        checkOut: staySearchParams.checkOut,
        adults: staySearchParams.guests.adults,
        children: staySearchParams.guests.children,
        infants: staySearchParams.guests.infants,
        pets: staySearchParams.guests.pets,
    }).toString()

    navigate(`/stays?${query}`)
    setIsOpen(false)
}

return {


     {
    <button className="search-btn" onClick={handleSearch}>
    Search
</button>
}
}