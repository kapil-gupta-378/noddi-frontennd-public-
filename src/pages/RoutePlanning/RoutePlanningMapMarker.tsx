import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { iso8601ToHhMm } from '../../utils'

const COLOR = 'rgb(99, 102, 241)'

const RoutePlanningMapMarker = ({ booking, markerRefs, onClickFn }) => {
  // https://www.geoapify.com/create-custom-map-marker-icon
  const getBookingMarkerIcon = (color) => {
    const html = (
      <div className='custom-div-icon-sm'>
        <div style={{ background: color }} className='marker-pin-sm' />
      </div>
    )

    return divIcon({
      html: renderToStaticMarkup(html),
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    })
  }

  return (
    <Marker
      ref={(el) => (markerRefs.current[booking.id] = el)}
      position={[booking.latitude, booking.longitude]}
      icon={getBookingMarkerIcon(COLOR)}
      eventHandlers={{
        click: () => {
          onClickFn(booking.id)
        }
      }}
    >
      <Popup>
        <p className={'m-0'}>
          <b>Slug:</b> {booking.slug}
        </p>

        <p className={'m-0'}>
          <b>User group:</b> {booking.user_group_name}
        </p>

        {booking.start_time && booking.end_time && (
          <p className={'mb-0'}>
            <b>Time slot:</b> {iso8601ToHhMm(booking.start_time)} - {iso8601ToHhMm(booking.end_time)}
          </p>
        )}
      </Popup>
    </Marker>
  )
}

export default RoutePlanningMapMarker
