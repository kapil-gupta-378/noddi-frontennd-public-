import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { Button, Image } from 'react-bootstrap'
import { MapMode } from '../../../types/map'
import StreetViewIcon from '../../../assets/icons/google-street-view-person.png'

const BookingMapToolbar = ({ mapMode, setMapMode, toolbarText }) => {
  const ref = useRef(null)
  useEffect(() => {
    L.DomEvent.disableClickPropagation(ref.current)
    L.DomEvent.disableScrollPropagation(ref.current)
  }, [])

  const onToolbarButtonClick = ({ selectedMapMode }) => {
    if (selectedMapMode === mapMode) {
      setMapMode(MapMode.None)
    } else {
      setMapMode(selectedMapMode)
    }
  }

  return (
    <>
      <div className={'bookings-area-toolbar-container'}>
        {toolbarText.length > 0 && (
          <div ref={ref} className={'bookings-area-toolbar-text'}>
            {toolbarText.map((val, index) => {
              return (
                <p className={'m-0'} key={index}>
                  {val}
                </p>
              )
            })}
          </div>
        )}
      </div>

      <div className={'bookings-area-map-buttons-container'}>
        <div ref={ref} className={'bookings-area-map-buttons'}>
          <Button
            onClick={() => onToolbarButtonClick({ selectedMapMode: MapMode.StreetView })}
            className={`bookings-area-toolbar-button bg-transparent ${mapMode === MapMode.StreetView ? 'bookings-area-toolbar-button-selected' : ''}`}
          >
            <Image src={StreetViewIcon} width={30} />
          </Button>
        </div>
      </div>
    </>
  )
}

export default BookingMapToolbar
