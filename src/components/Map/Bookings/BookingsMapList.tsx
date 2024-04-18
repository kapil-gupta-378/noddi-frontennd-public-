import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { Form, ListGroup } from 'react-bootstrap'
import { dateToHhMM } from '../../../utils'

const BookingMapList = ({ mapRef, bookings, markerRefs, onChangeFilteredMarkers }) => {
  const ref = useRef(null)

  const [searchState, setSearchState] = useState({
    query: '',
    list: bookings
  })

  useEffect(() => {
    L.DomEvent.disableClickPropagation(ref.current)
    L.DomEvent.disableScrollPropagation(ref.current)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 600 && searchState.query !== '') {
        setSearchState({
          query: '',
          list: bookings
        })
        onChangeFilteredMarkers({ indexes: bookings.map((b) => b.index) })
      }
    })
  }, [])

  const handleSearchChange = (e) => {
    const trimStr = (str) => str.toLowerCase().replaceAll(' ', '')

    const searchValue = trimStr(e.target.value)
    const filteredBookings = bookings.filter((booking) => {
      if (searchValue === '') return bookings
      return (
        trimStr(booking.name).includes(searchValue) ||
        trimStr(booking.id).includes(searchValue) ||
        trimStr(booking.start).includes(searchValue) ||
        trimStr(booking.end).includes(searchValue) ||
        `${dateToHhMM(new Date(booking.start))}-${dateToHhMM(new Date(booking.end))}`.includes(searchValue) ||
        booking.SalesItems.some((SalesItems) => trimStr(SalesItems).includes(searchValue))
      )
    })
    setSearchState({
      query: e.target.value,
      list: filteredBookings
    })
    onChangeFilteredMarkers({ indexes: filteredBookings.map((b) => b.index) })
  }

  return (
    <>
      <div className={'bookings-area-map-search-container'}>
        <div ref={ref} className={'bookings-area-map-search'}>
          <Form className={''}>
            <Form.Control type={'search'} placeholder={'Search for anything'} className={''} aria-label={'Search'} value={searchState.query} onChange={handleSearchChange} />
          </Form>
        </div>
      </div>

      <div className={'bookings-area-map-list-container'}>
        <div ref={ref} className={'bookings-area-map-list'}>
          <ListGroup className={'bookings-area-map-list-group'}>
            {searchState.list.length === 0 && searchState.query !== '' && <p className={'ms-1'}>No bookings match the query..</p>}

            {searchState.list.map((booking, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => {
                    const markerRef = markerRefs.current[booking.index]
                    markerRef.openPopup()
                    mapRef.flyTo([markerRef._latlng.lat, markerRef._latlng.lng], 18, {
                      animate: true,
                      duration: 0.5
                    })
                  }}
                >
                  {booking.name}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      </div>
    </>
  )
}

export default BookingMapList
