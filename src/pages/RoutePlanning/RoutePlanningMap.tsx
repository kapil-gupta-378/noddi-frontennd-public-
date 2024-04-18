import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { INITIAL_BOUNDS } from '../../components/Map/utils'
import RoutePlanningMapMarker from './RoutePlanningMapMarker'
import React from 'react'
import { Map } from 'leaflet'

const RoutePlanningMap = ({ bookings }) => {
  const [mapRef, setMapRef] = useState(null)
  const markerRefs = useRef<Map[]>([])
  const [markers, setMarkers] = useState([])

  const onClickFn = (index) => {
    const markerRef = markerRefs.current[index]
    markerRef?.openPopup()
    mapRef.flyTo([markerRef?._latlng.lat, markerRef?._latlng.lng], 16, {
      animate: true,
      duration: 1
    })
  }

  useEffect(() => {
    if (!mapRef) return

    markerRefs.current = new Array(bookings.length)
    const markers = bookings.map((booking) => <RoutePlanningMapMarker key={booking.id} mapRef={mapRef} booking={booking} markerRefs={markerRefs} onClickFn={onClickFn} />)
    setMarkers(markers)

    mapRef.doubleClickZoom.disable()

    const bounds = bookings.map((v) => [v.latitude, v.longitude])
    if (bounds.length > 0) {
      mapRef.fitBounds(bounds, { padding: [50, 50] })
    } else {
      mapRef.fitBounds(INITIAL_BOUNDS)
    }
  }, [mapRef])

  return (
    <MapContainer ref={setMapRef} minZoom={5} scrollWheelZoom={true} attributionControl={false} zoomControl={false} className={'route-planer-bookings-map-container'}>
      <TileLayer maxZoom={19} url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'} />
      <ZoomControl position={'topleft'} />

      {/* Markers */}
      {markers.map((b) => b)}
    </MapContainer>
  )
}

export default RoutePlanningMap
