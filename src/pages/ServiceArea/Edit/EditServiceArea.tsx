import 'leaflet/dist/leaflet.css'
import SEO from '../../../components/SEO'
import { Button, ButtonGroup, Dropdown, DropdownButton, Modal } from 'react-bootstrap'
import Heading from '../../../components/Heading'
import { useEffect, useState } from 'react'
import ServiceAreaInputs from '../ServiceAreaInputs'
import ServiceAreaSlotTable from '../ServiceAreaSlotTable'
import NoddiBreadcrumb from '../../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../../adapters/xhr/axiosPrivate'
import CenterSpinner from '../../../components/CenterSpinner'
import { sortTimeSlotTemplate } from '../../LicenseArea/Create/TimeSlotTemplates'
import ErrorModal from '../../../components/ErrorModal'
import DrawServiceAreaMap from '../../../components/Map/DrawArea/DrawServiceAreaMap'
import { setDifference } from '../../../components/Map/utils'
import { constants } from '../../../constant'
import { getEndpointUrl } from '../../../helper'

const EditServiceArea = () => {
  const { licenseAreaId, serviceAreaId } = useParams()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [spinnerMessage, setSpinnerMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [existingH3Indexes, setExistingH3Indexes] = useState(new Set())
  const [selectedH3Indexes, setSelectedH3Indexes] = useState(new Set())
  const [selectedMultiPolygons, setSelectedMultiPolygons] = useState([])
  const [boundaryH3Indexes, setBoundaryH3Indexes] = useState(new Set())
  const [boundaryMultiPolygons, setBoundaryMultiPolygons] = useState([])
  const [serviceAreaName, setServiceAreaName] = useState('')
  const [licenseArea, setLicenseArea] = useState(null)
  const [existingServiceAreas, setExistingServiceAreas] = useState([])
  const [licenseCategories, setLicenseCategories] = useState([])
  const [timeSlotTemplatesServiceArea, setTimeSlotTemplatesServiceArea] = useState([])

  const fetchData = async () => {
    setSpinnerMessage('Retrieving service area..')
    const {apiEndpoints} = constants
    const licenseAreaUrl: string = getEndpointUrl(apiEndpoints.getServiceAreaById, {"licenseAreaId": licenseAreaId, "serviceAreaId": serviceAreaId})

    await Promise.all([axiosPrivate.get(licenseAreaUrl)])
      .then((values) => {
        const serviceAreaData = values[0].data
        setExistingH3Indexes(new Set(serviceAreaData.h3_indexes))
        setSelectedH3Indexes(new Set(serviceAreaData.h3_indexes))
        setSelectedMultiPolygons(serviceAreaData.multi_polygon)
        setBoundaryH3Indexes(new Set(serviceAreaData.license_area.h3_indexes))
        setBoundaryMultiPolygons(serviceAreaData.license_area.multi_polygon)
        setLicenseArea(serviceAreaData.license_area)
        setLicenseCategories(serviceAreaData.license_area.license_categories)
        setExistingServiceAreas(serviceAreaData.license_area.service_areas.filter((sa) => sa.id !== serviceAreaId))
        setServiceAreaName(serviceAreaData.name)

        sortTimeSlotTemplate(serviceAreaData.time_slot_templates)
        setTimeSlotTemplatesServiceArea(serviceAreaData.time_slot_templates)

        setSpinnerMessage(null)
      })
      .catch((error) => {
        setErrors([error.response.data.errors])
        setSpinnerMessage(null)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const disableSaveButton = () => {
    if (selectedH3Indexes.size === 0) {
      return true
    } else if (!serviceAreaName.trim()) {
      return true
    } else if (timeSlotTemplatesServiceArea.length === 0) {
      return true
    }

    return false
  }

  const onSave = () => {
    setSpinnerMessage('Saving service area..')

    const removedH3Indexes = setDifference({
      setA: existingH3Indexes,
      setB: selectedH3Indexes
    })
    const newH3Indexes = setDifference({
      setA: selectedH3Indexes,
      setB: existingH3Indexes
    })

    const url = `/v1/license-areas/id/${licenseAreaId}/service-areas/id/${serviceAreaId}/update/`
    const formData = new FormData()
    formData.append('name', serviceAreaName.trim())
    formData.append('removed_h3_indexes', JSON.stringify(Array.from(removedH3Indexes)))
    formData.append('new_h3_indexes', JSON.stringify(Array.from(newH3Indexes)))
    formData.append('multi_polygon', JSON.stringify(selectedMultiPolygons))
    formData.append('time_slot_templates', JSON.stringify(timeSlotTemplatesServiceArea))

    axiosPrivate
      .post(url, formData)
      .then(() => {
        setSpinnerMessage(null)
        navigate(`/license-areas`)
      })
      .catch((error) => {
        setErrors([error])
        setSpinnerMessage(null)
      })
  }

  const DeleteServiceAreaModal = () => {
    return (
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered={true} size={'sm'}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Service Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={'mb-0'}>Are you sure you want to delete this service area?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={'danger'}
            onClick={() => {
              setSpinnerMessage('Deleting service area..')
              const url = `/v1/license-areas/id/${licenseAreaId}/service-areas/id/${serviceAreaId}/delete/`
              axiosPrivate
                .delete(url)
                .then(() => {
                  setSpinnerMessage(null)
                  navigate(`/license-areas/${licenseAreaId}`)
                })
                .catch((error) => {
                  setErrors(error.response.data.errors)
                  setSpinnerMessage(null)
                })
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const OptionsButton = () => {
    return (
      <DropdownButton title={'Options'} as={ButtonGroup} variant={'secondary'} size={'sm'}>
        <Dropdown.Item onClick={() => setShowDeleteModal(true)}>Delete</Dropdown.Item>
      </DropdownButton>
    )
  }

  return spinnerMessage ? (
    <CenterSpinner text={spinnerMessage} />
  ) : (
    <>
      <SEO title={'Edit service area'} />
      <NoddiBreadcrumb
        items={[
          {
            title: 'Home',
            path: '/'
          },
          {
            title: 'License areas',
            path: '/license-areas'
          },
          {
            title: licenseAreaId,
            path: `/license-areas/${licenseAreaId}`
          },
          {
            title: 'Edit service area',
            path: `/license-areas/${licenseAreaId}/service-areas/${serviceAreaId}}`
          }
        ]}
      />

      {licenseArea ? (
        <>
          <Heading text={`Edit ${serviceAreaName}`} button={OptionsButton()} />
          <DeleteServiceAreaModal />

          <DrawServiceAreaMap
            selectedH3Indexes={selectedH3Indexes}
            setSelectedH3Indexes={setSelectedH3Indexes}
            selectedMultiPolygons={selectedMultiPolygons}
            setSelectedMultiPolygons={setSelectedMultiPolygons}
            existingServiceAreas={existingServiceAreas}
            boundaryH3Indexes={boundaryH3Indexes}
            boundaryMultiPolygons={boundaryMultiPolygons}
            setBoundaryMultiPolygons={setBoundaryMultiPolygons}
          />
          <ServiceAreaInputs serviceAreaName={serviceAreaName} setServiceAreaName={setServiceAreaName} licenseCategories={licenseCategories} licenseArea={licenseArea} />
          <ServiceAreaSlotTable timeSlotTemplates={timeSlotTemplatesServiceArea} setTimeSlotTemplates={setTimeSlotTemplatesServiceArea} />
          <Button disabled={disableSaveButton()} onClick={onSave}>
            Save
          </Button>
        </>
      ) : (
        <p>Can't find service area..</p>
      )}
      <ErrorModal errors={errors} setErrors={setErrors} />
    </>
  )
}

export default EditServiceArea
