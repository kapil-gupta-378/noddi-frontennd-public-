import React, { useEffect } from 'react'
import L from 'leaflet'
import { Button, Image } from 'react-bootstrap'
import { MapMode } from '../../../types/map'
import BroomIcon from '../../../assets/icons/broom.png'
import MagnifyingGlassIcon from '../../../assets/icons/magnifying-glass.png'
import PaintbrushIcon from '../../../assets/icons/paintbrush.png'
import StreetViewIcon from '../../../assets/icons/street-view.png'

const DrawAreaMapToolbar = ({ mapMode, setMapMode, toolbarText }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
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
    <div className={'create-area-toolbar-container'}>
      {toolbarText.length > 0 && (
        <div ref={ref} className={'create-area-toolbar-text'}>
          {toolbarText.map((val, index) => {
            return (
              <p className={'m-0'} key={index}>
                {val}
              </p>
            )
          })}
        </div>
      )}

      <div ref={ref} className={'create-area-toolbar-buttons'}>
        <Button
          onClick={() => onToolbarButtonClick({ selectedMapMode: MapMode.Draw })}
          className={`create-area-toolbar-button bg-transparent ${mapMode === MapMode.Draw ? 'create-area-toolbar-button-selected' : ''}`}
        >
          <Image src={PaintbrushIcon} height={33} style={{ marginBottom: '9px' }} />
        </Button>
        <Button
          onClick={() => onToolbarButtonClick({ selectedMapMode: MapMode.Select })}
          className={`create-area-toolbar-button bg-transparent ${mapMode === MapMode.Select ? 'create-area-toolbar-button-selected' : ''}`}
        >
          <Image src={MagnifyingGlassIcon} height={33} style={{ marginBottom: '9px' }} />
        </Button>
        <Button
          onClick={() => onToolbarButtonClick({ selectedMapMode: MapMode.Delete })}
          className={`create-area-toolbar-button bg-transparent ${mapMode === MapMode.Delete ? 'create-area-toolbar-button-selected' : ''}`}
        >
          <Image src={BroomIcon} height={33} style={{ marginBottom: '9px' }} />
        </Button>
        <Button
          onClick={() => onToolbarButtonClick({ selectedMapMode: MapMode.StreetView })}
          className={`create-area-toolbar-button bg-transparent ${mapMode === MapMode.StreetView ? 'create-area-toolbar-button-selected' : ''}`}
        >
          <Image src={StreetViewIcon} height={32} style={{ marginBottom: '9px' }} />
        </Button>
      </div>
    </div>
  )
}

export default DrawAreaMapToolbar
