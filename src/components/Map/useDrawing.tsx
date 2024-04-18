import { useRef, useState } from 'react'
import { MapMode } from '../../types/map'
import { INITIAL_BOUNDS, updateCircleRadius, updateDragging, updateH3CellsViewPort, updateToolbarText } from './utils'

const useDrawing = () => {
  const cursorShapeRef = useRef()
  const [mapRef, setMapRef] = useState(null)
  const [mapMode, setMapMode] = useState(MapMode.None)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentCenter, setCurrentCenter] = useState(INITIAL_BOUNDS[0])
  const [cursorBoundary, setCursorBoundary] = useState(0.01)
  const [toolbarText, setToolbarText] = useState([])
  const [showExistingServiceAreas, setShowExistingServiceAreas] = useState(false)

  // Multi polygons
  const [viewPortMultiPolygons, setViewPortMultiPolygons] = useState([])

  const onMapModeChange = () => {
    if (!mapRef) {
      return
    }

    updateToolbarText({ mapRef, mapMode, setToolbarText })
    updateDragging({ mapRef, mapMode })
    updateH3CellsViewPort({ mapRef, setViewPortMultiPolygons })
    updateCircleRadius({ mapRef, setCursorBoundary })
  }

  return [
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
  ]
}

export default useDrawing
