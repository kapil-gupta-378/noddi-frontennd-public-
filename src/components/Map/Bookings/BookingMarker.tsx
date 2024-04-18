import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { iso8601ToHhMm } from '../../../utils'
import { MapMode } from '../../../types/map'
import { googleStreetViewUrl } from '../utils'

const COLOR = 'rgb(255, 69, 33)'

const BookingMarker = ({ mapMode, booking, onClickFn, markerRefs }) => {
  // https://www.geoapify.com/create-custom-map-marker-icon
  const getCustomerMarkerIcon = (color) => {
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
      ref={(el) => (markerRefs.current[booking.index] = el)}
      position={[booking.lat, booking.long]}
      icon={getCustomerMarkerIcon(COLOR)}
      eventHandlers={{
        click: () => {
          if (mapMode === MapMode.StreetView) {
            const url = googleStreetViewUrl({
              lat: booking.lat,
              long: booking.lng
            })
            window.open(url, '_blank').focus()
          } else {
            onClickFn(booking.index)
          }
        }
      }}
    >
      <Popup>
        <p className={'m-0'}>
          <b>Name:</b> {booking.name}
        </p>

        {booking.start && booking.end && (
          <p className={'mb-0'}>
            <b>Slot:</b> {iso8601ToHhMm(booking.start)} - {iso8601ToHhMm(booking.end)}
          </p>
        )}

        {booking.SalesItems && (
          <>
            <b>SalesItems:</b>
            <ul className={'mb-0'}>
              {booking.SalesItems.length > 0 ? (
                booking.SalesItems.map((SalesItems, index) => {
                  return <li key={index}>{SalesItems}</li>
                })
              ) : (
                <li>[]</li>
              )}
            </ul>
          </>
        )}
      </Popup>
    </Marker>
  )
}

export default BookingMarker
