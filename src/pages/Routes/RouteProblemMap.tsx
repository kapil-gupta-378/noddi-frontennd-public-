import React, { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { SingleRouteSolutionData } from './interface'

const RouteProblemMap = ({ data }: { data: SingleRouteSolutionData }) => {
  const getMarkerIcon = useMemo(() => {
    const html = (
      <div className='custom-div-icon-sm'>
        <div style={{ background: 'rgb(99, 102, 241)' }} className='marker-pin-sm' />
      </div>
    )

    return divIcon({
      html: renderToStaticMarkup(html),
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    })
  }, [])

  return (
    <>
      <MapContainer
        center={[59.97494405975913, 10.954742431640627]}
        zoom={13}
        minZoom={5}
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={false}
        className={'route-planer-bookings-map-container'}
      >
        <TileLayer maxZoom={19} url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'} />
        <ZoomControl position={'topleft'} />

        {data ? (
          <Marker icon={getMarkerIcon} position={[59.97494405975913, 10.954742431640627]}>
            <Popup>
              <p className={'m-0'}>
                <b>Distance:</b> {(data.summary?.total_distance / 1000).toFixed(2)} KM.
              </p>
              <p className={'m-0'}>
                <b>Time:</b> {(data.summary?.total_time / 3600).toFixed(2)} Hr.
              </p>
              <p className={'m-0'}>
                <b>Cost:</b> {data.summary?.total_cost}
              </p>
            </Popup>
          </Marker>
        ) : (
          <></>
        )}
      </MapContainer>
    </>
  )
}

export default RouteProblemMap
