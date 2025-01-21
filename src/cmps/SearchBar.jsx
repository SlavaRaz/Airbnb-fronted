import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { SearchPreview } from './SearchPreview.jsx';
import { StaySearchForm } from './StaySearchForm.jsx';

export function SearchBar() {
    const [searchParams] = useSearchParams()
    const [selectedTab, setSelectedTab] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {

        setSelectedTab([])
        if (location.pathname.startsWith('/stay')) return
        let lastScrollY = window.scrollY
        const handleScroll = () => {
            if (window.scrollY === 0) setIsOpen(true)
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY && isOpen) {
                // User is scrolling down, close the search bar
                setIsOpen(false)
            } else if (window.scrollY === 0 && !isOpen) {
                // User is scrolling up, open the search bar
                setIsOpen(true)
            }
            lastScrollY = currentScrollY
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [location.pathname, isOpen])

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

    function handleToggle() {
        setIsOpen((prev) => !prev)
    }

    function handleSearchParamChange(field, value) {
        setStaySearchParams((prevParams) => ({
            ...prevParams,
            [field]: value,
        }))
    }

    function handlePreviewClick(tabToSet) {
        setSelectedTab(tabToSet)
        setIsOpen(true)
    }

    return (
        <div className={`search-bars ${isOpen ? 'search-bars-open' : ''}`}>
            {!isOpen && <SearchPreview
                staySearchParams={staySearchParams}
                handlePreviewClick={handlePreviewClick} />}
            <StaySearchForm
                handleSearchParamChange={handleSearchParamChange}
                staySearchParams={staySearchParams}
                handleToggle={handleToggle}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />

            {isOpen && <div className="screen-blur" onClick={handleToggle}></div>}
        </div>
    );
}
