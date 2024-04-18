import { cellsToMultiPolygon, cellToBoundary, polygonToCells } from 'h3-js'
import { MapMode } from '../../types/map'
import { difference, intersect, multiPolygon, union } from '@turf/turf'
import { Rectangle } from 'react-leaflet'

export const WORLD_BOUNDS = [
  [90, -180],
  [90, 180],
  [-90, 180],
  [-90, -180]
]
export const INITIAL_BOUNDS = [
  [59.97494405975913, 10.954742431640627],
  [59.8477466534541, 10.509796142578127]
]
export const DATABASE_H3_RESOLUTION = 11
export const H3_CELLS_MIN_ZOOM = 16
export const POLYGON_STYLES = {
  unselected: {
    color: 'black',
    fillColor: 'blue',
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0
  },
  selected: {
    color: 'black',
    fillColor: 'blue',
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0.4
  },
  existing: {
    color: 'black',
    fillColor: 'red',
    weight: 1,
    opacity: 1.0,
    fillOpacity: 0.6
  },
  booking: {
    color: 'black',
    fillColor: 'blue',
    weight: 0.5,
    opacity: 1.0,
    fillOpacity: 0.05
  },
  disabled: {
    color: 'black',
    fillColor: 'black',
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0.7
  }
}

export const CursorShape = ({ mapMode, cursorShapeRef, currentCenter, cursorBoundary }) => {
  if (mapMode !== MapMode.Draw && mapMode !== MapMode.Delete) return
  return (
    <Rectangle
      bounds={[
        [currentCenter[0] - cursorBoundary, currentCenter[1] - cursorBoundary * 2],
        [currentCenter[0] + cursorBoundary, currentCenter[1] + cursorBoundary * 2]
      ]}
      ref={(ref) => (cursorShapeRef.current = ref)}
      color={mapMode === MapMode.Draw ? 'blue' : 'red'}
      fillColor={mapMode === MapMode.Draw ? 'blue' : 'red'}
    />
  )
}

export const mapEvents = ({ mapRef, mapMode, setToolbarText, setCursorBoundary, setCurrentCenter, isDrawing, setIsDrawing, onCellSelect, onDrawSelect, setViewPortMultiPolygons }) => {
  return {
    zoom: () => {
      updateToolbarText({ mapRef, mapMode, setToolbarText })
      updateDragging({ mapRef, mapMode })
      if (mapMode === MapMode.Draw || mapMode === MapMode.Delete) {
        updateCircleRadius({ mapRef, setCursorBoundary })
      }
    },
    moveend: () => {
      updateH3CellsViewPort({ mapRef, setViewPortMultiPolygons })
    },
    mousedown: (e) => {
      if (mapMode === MapMode.Select || mapMode === MapMode.Draw || mapMode === MapMode.Delete) {
        setIsDrawing(true)
      } else if (mapMode === MapMode.StreetView) {
        const url = googleStreetViewUrl({
          lat: e.latlng.lat,
          long: e.latlng.lng
        })
        window.open(url, '_blank').focus()
      }
    },
    mouseup: (e) => {
      if (isDrawing) {
        if (mapMode === MapMode.Select && mapRef.getZoom() >= H3_CELLS_MIN_ZOOM) {
          onCellSelect(e) // For click events
        } else if (mapMode === MapMode.Draw || mapMode === MapMode.Delete) {
          onDrawSelect(e) // For click events
        }
      }
      setIsDrawing(false)
    },
    mousemove: (e) => {
      if (mapMode === MapMode.Draw || mapMode === MapMode.Delete) {
        setCurrentCenter([e.latlng.lat, e.latlng.lng])

        const currentZoom = mapRef.getZoom()
        if (isDrawing && currentZoom >= 16) {
          onDrawSelect(e)
        }
      }
    }
  }
}

/**
 *
 * @param {Object} - bounding box dimensions
 * @param {Number} resolution - resolution of hexagons

 * @returns - an array of h3 indices within the given bounding box
 */
export const getH3IndexesForBoundingBox = ({ north, south, east, west }, resolution = 12) => {
  const nw = [north, west]
  const ne = [north, east]
  const sw = [south, west]
  const se = [south, east]

  return polygonToCells([nw, ne, se, sw], resolution, false)
}

export const addSelectedMultiPolygon = ({ h3Indexes, selectedMultiPolygons, setSelectedMultiPolygons }) => {
  // New H3 indexes --> new multi polygon
  const newMultiPolygon = toMultiPolygon({ h3Indexes: h3Indexes })

  // New + existing multi polygons --> turf multi polygons
  const turfMultiPolygons = selectedMultiPolygons.flatMap((smp) => multiPolygon(smp))
  turfMultiPolygons.push(multiPolygon(newMultiPolygon))

  // Turf multi polygons --> combined multi polygon
  let combinedMultiPolygon = turfMultiPolygons[0]
  for (let i = 1; i < turfMultiPolygons.length; i++) {
    combinedMultiPolygon = union(combinedMultiPolygon, turfMultiPolygons[i])
  }

  setSelectedMultiPolygons([combinedMultiPolygon.geometry.coordinates])
}

export const deleteSelectedMultiPolygon = ({ h3Indexes, selectedMultiPolygons, setSelectedMultiPolygons }) => {
  // New H3 indexes --> new multi polygon
  const newMultiPolygon = toMultiPolygon({ h3Indexes: h3Indexes })

  // New multi polygon --> turf multi polygon
  const newTurfMultiPolygon = multiPolygon(newMultiPolygon)

  // Existing multi polygons --> existing turf multi polygons
  let existingTurfMultiPolygons = selectedMultiPolygons.flatMap((smp) => multiPolygon(smp))

  // For every existing turf multi polygon, remove area overlapping with the area to be deleted.
  existingTurfMultiPolygons = existingTurfMultiPolygons.map((existingTurfMultiPolygon) => {
    const intersectedMultiPolygon = intersect(existingTurfMultiPolygon, newTurfMultiPolygon)
    if (intersectedMultiPolygon) {
      return difference(existingTurfMultiPolygon, intersectedMultiPolygon)
    }
    return existingTurfMultiPolygon
  })

  let newMultiPolygons = []
  if (existingTurfMultiPolygons[0] !== null) {
    newMultiPolygons = existingTurfMultiPolygons.map((p) => p.geometry.coordinates)
  }

  setSelectedMultiPolygons(newMultiPolygons)
}

export const updateCircleRadius = ({ mapRef, setCursorBoundary }) => {
  const currentZoom = mapRef.getZoom()

  if (currentZoom >= 17) {
    setCursorBoundary(0.0001)
  } else if (currentZoom >= 17) {
    setCursorBoundary(0.00025)
  } else if (currentZoom >= 16) {
    setCursorBoundary(0.0005)
  } else if (currentZoom >= 15) {
    setCursorBoundary(0.0015)
  } else if (currentZoom >= 14) {
    setCursorBoundary(0.003)
  } else if (currentZoom >= 13) {
    setCursorBoundary(0.005)
  } else {
    setCursorBoundary(0.01)
  }
}

export const updateH3CellsViewPort = ({ mapRef, setViewPortMultiPolygons }) => {
  // Set H3 cells for view port
  if (mapRef.getZoom() >= H3_CELLS_MIN_ZOOM) {
    setViewPortMultiPolygons(getMultiPolygonsForView({ mapRef }))
  } else {
    setViewPortMultiPolygons([])
  }
}

export const updateDragging = ({ mapRef, mapMode }) => {
  if (mapMode === MapMode.Select && mapRef.getZoom() >= H3_CELLS_MIN_ZOOM) {
    mapRef.dragging.disable()
  } else if (mapMode === MapMode.Draw || mapMode === MapMode.Delete) {
    mapRef.dragging.disable()
  } else {
    mapRef.dragging.enable()
  }
}

export const updateToolbarText = ({ mapRef, mapMode, setToolbarText }) => {
  if (mapMode === MapMode.Select && mapRef.getZoom() < H3_CELLS_MIN_ZOOM) {
    setToolbarText(['Zoom in to select cells'])
  } else if (mapMode === MapMode.Delete) {
    setToolbarText(['Click or drag to delete cells'])
  } else if (mapMode === MapMode.Draw) {
    const currentZoom = mapRef.getZoom()
    if (currentZoom >= 16) {
      setToolbarText(['Click or drag to draw cells'])
    } else {
      setToolbarText(['Click to draw cells', '(Zoom in to drag)'])
    }
  } else if (mapMode === MapMode.StreetView) {
    setToolbarText(['Click to open Google street view'])
  } else {
    setToolbarText([])
  }
}

export const getMultiPolygonsForView = ({ mapRef }) => {
  if (mapRef.getZoom() < H3_CELLS_MIN_ZOOM) {
    return []
  }

  const h3Indexes = getH3IndexesForView({ mapRef })
  return h3Indexes.map((h3Index) => cellToBoundary(h3Index))
}

export const getH3IndexesForView = ({ mapRef }) => {
  const bounds = mapRef.getBounds()
  return getH3IndexesForBoundingBox(
    {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest()
    },
    DATABASE_H3_RESOLUTION
  )
}

export const toMultiPolygon = ({ h3Indexes }) => {
  return cellsToMultiPolygon(h3Indexes)
}

export const setDifference = ({ setA, setB }) => {
  const _difference = new Set(setA)
  for (const elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

export const setIntersection = ({ setA, setB }) => {
  const _intersection = new Set()
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

export const googleStreetViewUrl = ({ lat: lat, long: long }) => {
  return `https://maps.google.com/maps?q=&layer=c&cbll=${lat},${long}`
}
