import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'
import { AiFillHome } from "react-icons/ai"

export function StayMap({ stay }) {


    const { lat, lan: lng } = stay.loc
    const [coordinates, setCoordinates] = useState({ lat, lng })
    const zoom = 11

    const Popper = () => <div className="map-popper"><AiFillHome /><div className="popper-wedge"></div></div>

    function onMapClick({ lat, lng }) {
        setCoordinates({ lat, lng })
    }

    return (
        <div style={{ height: '480px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAiqsqRM3mmEYYtnCoFFVckjmCk5LposZA" }}
                center={coordinates}
                defaultZoom={zoom}
                onClick={onMapClick}
                yesIWantToUseGoogleMapApiInternals

            >
                <Popper lat={lat} lng={lng} onClick={() => { }} />
            </GoogleMapReact>
        </div>
    )
}
