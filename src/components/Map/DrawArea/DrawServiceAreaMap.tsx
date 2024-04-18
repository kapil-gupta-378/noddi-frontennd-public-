import 'leaflet/dist/leaflet.css'
import { MapContainer, Polygon, Popup, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet'
import { useEffect } from 'react'
import { addSelectedMultiPolygon, CursorShape, deleteSelectedMultiPolygon, getH3IndexesForBoundingBox, getMultiPolygonsForView, mapEvents, setDifference, setIntersection } from '../utils'
import { latLngToCell } from 'h3-js'
import DrawAreaMapToolbar from './DrawAreaMapToolbar'
import { MapMode } from '../../../types/map'
import { DATABASE_H3_RESOLUTION, INITIAL_BOUNDS, POLYGON_STYLES, WORLD_BOUNDS } from '../utils'
import useDrawing from '../useDrawing'

const DrawServiceAreaMap = ({
  selectedH3Indexes,
  setSelectedH3Indexes,
  selectedMultiPolygons,
  setSelectedMultiPolygons,
  existingServiceAreas,
  boundaryH3Indexes,
  boundaryMultiPolygons,
  setBoundaryMultiPolygons
}) => {
  const [
    cursorShapeRef,
    mapRef,
    setMapRef,
    mapMode,
    setMapMode,
    isDrawing,
    setIsDrawing,
    currentCenter,
    setCurrentCenter,
    cursorBoundary,
    setCursorBoundary,
    toolbarText,
    setToolbarText,
    showExistingServiceAreas,
    setShowExistingServiceAreas,
    viewPortMultiPolygons,
    setViewPortMultiPolygons,
    onMapModeChange
  ] = useDrawing()

  useEffect(() => {
    onMapModeChange()
  }, [mapMode])

  useEffect(() => {
    if (!mapRef) return

    mapRef.doubleClickZoom.disable()
    setViewPortMultiPolygons(getMultiPolygonsForView({ mapRef }))

    if (boundaryH3Indexes.size > 0) {
      mapRef.setMaxBounds(boundaryMultiPolygons)
      mapRef.fitBounds(boundaryMultiPolygons)
      mapRef.setMinZoom(mapRef.getBoundsZoom(boundaryMultiPolygons))
      setBoundaryMultiPolygons([[[WORLD_BOUNDS], boundaryMultiPolygons]])
    }

    if (existingServiceAreas.length > 0) {
      setShowExistingServiceAreas(true)
    }
  }, [mapRef])

  const H3Polygons = () => {
    const addToSelected = ({ h3Indexes }) => {
      const newSet = new Set([...selectedH3Indexes, ...h3Indexes])
      setSelectedH3Indexes(newSet)
    }

    const deleteFromSelected = ({ h3Indexes }) => {
      const newSet = new Set(selectedH3Indexes)
      h3Indexes.forEach((h3Index) => newSet.delete(h3Index))
      setSelectedH3Indexes(newSet)
    }

    const onDrawSelect = () => {
      const bounds = cursorShapeRef.current.getBounds()
      const clickedH3Indexes = getH3IndexesForBoundingBox(
        {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        },
        DATABASE_H3_RESOLUTION
      )

      // Only get the H3 indexes touching the boundary H3 indexes.
      let h3Indexes = Array.from(
        setIntersection({
          setA: boundaryH3Indexes,
          setB: new Set(clickedH3Indexes)
        })
      )
      if (h3Indexes.length === 0) return

      // Remove H3 indexes already defined in existing service areas
      existingServiceAreas.forEach((sa) => {
        const existingH3Indexes = new Set(sa.h3_indexes)
        h3Indexes = setDifference({ setA: h3Indexes, setB: existingH3Indexes })
      })
      h3Indexes = Array.from(h3Indexes)

      if (mapMode === MapMode.Draw) {
        addToSelected({ h3Indexes })
        addSelectedMultiPolygon({
          h3Indexes,
          selectedMultiPolygons,
          setSelectedMultiPolygons
        })
      } else if (mapMode === MapMode.Delete) {
        deleteFromSelected({ h3Indexes })
        deleteSelectedMultiPolygon({
          h3Indexes,
          selectedMultiPolygons,
          setSelectedMultiPolygons
        })
      }
    }

    const onCellSelect = (e) => {
      // Find clicked H3 index
      const clickedH3Index = latLngToCell(e.latlng.lat, e.latlng.lng, DATABASE_H3_RESOLUTION)

      // Only get the H3 index touching the boundary H3 indexes.
      const h3Indexes = Array.from(
        setIntersection({
          setA: boundaryH3Indexes,
          setB: new Set([clickedH3Index])
        })
      )
      if (h3Indexes.length === 0) return

      // Remove H3 indexes already defined in existing service areas
      const already_exists = existingServiceAreas.some((sa) => sa.h3_indexes.includes(clickedH3Index))
      if (already_exists) return

      // Find the clicked H3Cell in the list of already selected H3 cells
      const isAlreadySelected = selectedH3Indexes.has(clickedH3Index)

      // Cell already selected --> Delete it
      if (isAlreadySelected) {
        deleteFromSelected({ h3Indexes: [clickedH3Index] })
        deleteSelectedMultiPolygon({
          h3Indexes: [clickedH3Index],
          selectedMultiPolygons,
          setSelectedMultiPolygons
        })
      }
      // If not --> Add it
      else {
        addToSelected({ h3Indexes: [clickedH3Index] })
        addSelectedMultiPolygon({
          h3Indexes: [clickedH3Index],
          selectedMultiPolygons,
          setSelectedMultiPolygons
        })
      }
    }

    useMapEvents(
      mapEvents({
        mapRef,
        mapMode,
        setToolbarText,
        setCursorBoundary,
        setCurrentCenter,
        isDrawing,
        setIsDrawing,
        onCellSelect,
        onDrawSelect,
        setViewPortMultiPolygons
      })
    )

    // Selected polygons
    const polygons = selectedMultiPolygons.flatMap((smp, index) => {
      return <Polygon key={`selected-mp-${index}`} pathOptions={POLYGON_STYLES.selected} positions={smp} />
    })

    // Existing service area polygons
    if (showExistingServiceAreas) {
      polygons.push(
        ...existingServiceAreas.flatMap((esa, index) => {
          return (
            <Polygon
              key={`existing-mp-${index}`}
              pathOptions={POLYGON_STYLES.existing}
              positions={esa.multi_polygon}
              eventHandlers={{
                onclick: (event) => event.target.openPopup()
              }}
            >
              <Popup>
                <h6>{esa.name}</h6>
              </Popup>
            </Polygon>
          )
        })
      )
    }

    // Boundary polygons
    polygons.push(
      ...boundaryMultiPolygons.flatMap((bmp, index) => {
        return (
          <Polygon
            key={`boundary-mp-${index}`}
            pathOptions={POLYGON_STYLES.disabled}
            positions={bmp}
            eventHandlers={{
              onclick: (event) => event.target.openPopup()
            }}
          >
            <Popup>
              <h6 className={'mb-0'}>Disabled</h6>
              <small>Outside license area</small>
            </Popup>
          </Polygon>
        )
      })
    )

    // Add view port polygons
    polygons.push(
      ...viewPortMultiPolygons.flatMap((mp, index) => {
        return <Polygon key={`viewport-mp-${index}`} pathOptions={POLYGON_STYLES.unselected} positions={mp} />
      })
    )

    return polygons
  }

  return (
    <MapContainer bounds={INITIAL_BOUNDS} scrollWheelZoom={true} attributionControl={false} zoomControl={false} className={'create-area-map-container'} ref={setMapRef}>
      <TileLayer maxZoom={19} url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'} />
      <ZoomControl position={'topleft'} />
      <H3Polygons />

      <DrawAreaMapToolbar mapMode={mapMode} setMapMode={setMapMode} toolbarText={toolbarText} />

      <CursorShape mapMode={mapMode} cursorShapeRef={cursorShapeRef} currentCenter={currentCenter} cursorBoundary={cursorBoundary} />
    </MapContainer>
  )
}

export default DrawServiceAreaMap
