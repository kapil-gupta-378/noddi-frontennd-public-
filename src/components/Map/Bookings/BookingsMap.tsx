import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { googleStreetViewUrl, INITIAL_BOUNDS } from '../utils'
import BookingMarker from './BookingMarker'
import { MapMode } from '../../../types/map'
import BookingMapToolbar from './BookingMapToolbar'
import BookingMapList from './BookingsMapList'

const BookingsMap = ({ bookings }) => {
  const [mapRef, setMapRef] = useState(null)
  const [mapMode, setMapMode] = useState(MapMode.None)
  const [toolbarText, setToolbarText] = useState([])
  const markerRefs = useRef([])
  const [markers, setMarkers] = useState([])
  const [filteredMarkers, setFilteredMarkers] = useState([])

  const onClickFn = (index) => {
    const markerRef = markerRefs.current[index]
    markerRef.openPopup()
    mapRef.flyTo([markerRef._latlng.lat, markerRef._latlng.lng], 18, {
      animate: true,
      duration: 0.5
    })
  }

  const onChangeFilteredMarkers = ({ indexes }) => {
    setFilteredMarkers(indexes.map((index) => markers[index]))
  }

  useEffect(() => {
    if (!mapRef) return

    markerRefs.current = new Array(bookings.length)
    const markers = bookings.map((booking) => <BookingMarker key={booking.index} mapRef={mapRef} mapMode={mapMode} booking={booking} onClickFn={onClickFn} markerRefs={markerRefs} />)
    setMarkers(markers)
    setFilteredMarkers(markers)

    mapRef.doubleClickZoom.disable()

    const bounds = bookings.map((v) => [v.lat, v.long])
    if (bounds.length > 0) {
      mapRef.fitBounds(bounds, { padding: [50, 50] })
    } else {
      mapRef.fitBounds(INITIAL_BOUNDS)
    }
  }, [mapRef])

  useEffect(() => {
    updateToolbarText()
  }, [mapMode])

  const updateToolbarText = () => {
    if (mapMode === MapMode.StreetView) {
      setToolbarText(['Click to open Google street view'])
    } else {
      setToolbarText([])
    }
  }

  const MapEvents = () => {
    useMapEvents({
      mousedown: (e) => {
        if (mapMode === MapMode.StreetView && e.originalEvent.button === 0) {
          const url = googleStreetViewUrl({
            lat: e.latlng.lat,
            long: e.latlng.lng
          })
          window.open(url, '_blank').focus()
        }
      }
    })
  }

  return (
    <MapContainer ref={setMapRef} minZoom={5} scrollWheelZoom={true} attributionControl={false} zoomControl={false} className={'bookings-area-map-container'}>
      <TileLayer maxZoom={19} url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'} />
      <ZoomControl position={'topleft'} />
      <MapEvents />

      {/* Markers */}
      {filteredMarkers.map((b) => b)}

      <BookingMapToolbar mapMode={mapMode} setMapMode={setMapMode} toolbarText={toolbarText} />
      <BookingMapList mapRef={mapRef} bookings={bookings} markerRefs={markerRefs} onChangeFilteredMarkers={onChangeFilteredMarkers} />
    </MapContainer>
  )
}

export default BookingsMap
