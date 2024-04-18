import 'leaflet/dist/leaflet.css'
import { MapContainer, Polygon, Popup, TileLayer, useMapEvents, ZoomControl } from 'react-leaflet'
import { useEffect } from 'react'
import {
  addSelectedMultiPolygon,
  CursorShape,
  DATABASE_H3_RESOLUTION,
  deleteSelectedMultiPolygon,
  getH3IndexesForBoundingBox,
  getMultiPolygonsForView,
  INITIAL_BOUNDS,
  mapEvents,
  POLYGON_STYLES,
  setDifference
} from '../utils'
import { latLngToCell } from 'h3-js'
import DrawAreaMapToolbar from './DrawAreaMapToolbar'
import { MapMode } from '../../../types/map'
import useDrawing from '../useDrawing'

const DrawLicenseAreaMap = ({ selectedH3Indexes, setSelectedH3Indexes, selectedMultiPolygons, setSelectedMultiPolygons, existingServiceAreas }) => {
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

    if (existingServiceAreas.length > 0) {
      setShowExistingServiceAreas(true)
    }

    if (selectedH3Indexes.size > 0) {
      mapRef.fitBounds(selectedMultiPolygons)
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
      let h3Indexes = getH3IndexesForBoundingBox(
        {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        },
        DATABASE_H3_RESOLUTION
      )

      // Remove H3 indexes already defined in existing service areas
      existingServiceAreas.forEach((sa) => {
        const existingH3Indexes = new Set(sa.h3_indexes)
        h3Indexes = setDifference({ setA: h3Indexes, setB: existingH3Indexes })
      })
      h3Indexes = Array.from(h3Indexes)

      if (mapMode === MapMode.Draw) {
        addToSelected({ h3Indexes: h3Indexes })
        addSelectedMultiPolygon({
          h3Indexes: h3Indexes,
          selectedMultiPolygons,
          setSelectedMultiPolygons
        })
      } else if (mapMode === MapMode.Delete) {
        deleteFromSelected({ h3Indexes: h3Indexes })
        deleteSelectedMultiPolygon({
          h3Indexes: h3Indexes,
          selectedMultiPolygons,
          setSelectedMultiPolygons
        })
      }
    }

    const onCellSelect = (e) => {
      // Find clicked H3 index
      const clickedH3Index = latLngToCell(e.latlng.lat, e.latlng.lng, DATABASE_H3_RESOLUTION)

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

    // Add view port polygons
    polygons.push(
      ...viewPortMultiPolygons.flatMap((mp, index) => {
        return <Polygon key={`viewport-mp-${index}`} pathOptions={POLYGON_STYLES.unselected} positions={mp} />
      })
    )

    return polygons
  }

  return (
    <MapContainer bounds={INITIAL_BOUNDS} minZoom={5} scrollWheelZoom={true} attributionControl={false} zoomControl={false} className={'create-area-map-container'} ref={setMapRef}>
      <TileLayer maxZoom={19} url={'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'} />
      <ZoomControl position={'topleft'} />
      <H3Polygons />

      <DrawAreaMapToolbar mapMode={mapMode} setMapMode={setMapMode} toolbarText={toolbarText} />

      <CursorShape mapMode={mapMode} cursorShapeRef={cursorShapeRef} currentCenter={currentCenter} cursorBoundary={cursorBoundary} />
    </MapContainer>
  )
}

export default DrawLicenseAreaMap
