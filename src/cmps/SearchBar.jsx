import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchPreview } from './SearchPreview.jsx';
// import { StaySearchForm } from './StaySearchForm.jsx';

export function SearchBar() {
    const [searchParams] = useSearchParams()
    
    // const navigate = useNavigate()
    
    const [staySearchParams, setStaySearchParams] = useState({
        location: searchParams.get('location') || '',
        checkIn: searchParams.get('checkIn') || '',
        checkOut: searchParams.get('checkOut') || '',
        guests: {
            adults: +searchParams.get('adults') || 0,
            children: +searchParams.get('children') || 0,
            infants: +searchParams.get('infants') || 0,
            pets: +searchParams.get('pets') || 0,
        },
    })

    console.log('staySearchParams', staySearchParams)

    const [selectedTab, setSelectedTab] = useState('location')
    const [isOpen, setIsOpen] = useState(false)

    function handleToggle() {
        setIsOpen((prev) => !prev)
    }

    function handlePreviewClick(tabToSet) {
        console.log('tabToSet', tabToSet)
        setSelectedTab(tabToSet)
        setIsOpen(true)
    }



    return (
        <div className={`search-bars ${isOpen ? 'search-bars-open' : ''}`}>
            <SearchPreview
                staySearchParams={staySearchParams}
                handlePreviewClick={handlePreviewClick}
            />
            {/* <StaySearchForm
                staySearchParams={staySearchParams}
                handleToggle={handleToggle}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            /> */}
           
            {isOpen && <div className="screen-blur" onClick={handleToggle}></div>}
        </div>
    );
}
