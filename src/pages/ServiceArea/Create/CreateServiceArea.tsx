import 'leaflet/dist/leaflet.css'
import SEO from '../../../components/SEO'
import { Button } from 'react-bootstrap'
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
import { constants } from '../../../constant'
import { getEndpointUrl } from '../../../helper'

const CreateServiceArea = () => {
  const { licenseAreaId } = useParams()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [spinnerMessage, setSpinnerMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)

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
    setSpinnerMessage('Retrieving license area..')

    const {apiEndpoints} = constants
    const licenseAreaUrl: string = getEndpointUrl(apiEndpoints.getLicenseAreaById, {"licenseAreaId": licenseAreaId})
    await Promise.all([axiosPrivate.get(licenseAreaUrl)])
      .then((values) => {
        const licenseAreaData = values[0].data
        setBoundaryH3Indexes(new Set(licenseAreaData.h3_indexes))
        setBoundaryMultiPolygons(licenseAreaData.multi_polygon)
        setLicenseArea(licenseAreaData)
        setLicenseCategories(licenseAreaData.license_categories)
        setExistingServiceAreas(licenseAreaData.service_areas)

        sortTimeSlotTemplate(licenseAreaData.time_slot_templates)
        setTimeSlotTemplatesServiceArea(
          licenseAreaData.time_slot_templates.map((timeSlotTemplate) => {
            return {
              ...timeSlotTemplate,
              monday_enabled: false,
              monday_price: 0,
              tuesday_enabled: false,
              tuesday_price: 0,
              wednesday_enabled: false,
              wednesday_price: 0,
              thursday_enabled: false,
              thursday_price: 0,
              friday_enabled: false,
              friday_price: 0,
              saturday_enabled: false,
              saturday_price: 0,
              sunday_enabled: false,
              sunday_price: 0
            }
          })
        )

        setSpinnerMessage(null)
      })
      .catch((error) => {
        setErrors([error])
        setSpinnerMessage(null)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const disableCreateButton = () => {
    if (selectedH3Indexes.size === 0) {
      return true
    } else if (!serviceAreaName.trim()) {
      return true
    } else if (timeSlotTemplatesServiceArea.length === 0) {
      return true
    }

    return false
  }

  const onCreate = () => {
    setSpinnerMessage('Creating service area..')

    const url = `/v1/license-areas/id/${licenseAreaId}/service-areas/create/`
    const formData = new FormData()
    formData.append('name', serviceAreaName.trim())
    formData.append('h3_indexes', JSON.stringify(Array.from(selectedH3Indexes)))
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

  return spinnerMessage ? (
    <CenterSpinner text={spinnerMessage} />
  ) : (
    <>
      <SEO title={'Create service area'} />
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
            title: 'Create service area',
            path: `/license-areas/${licenseAreaId}/service-areas/create`
          }
        ]}
      />

      {licenseArea ? (
        <>
          <Heading text='Create service area' />

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
          <Button disabled={disableCreateButton()} onClick={onCreate}>
            Create
          </Button>
        </>
      ) : (
        <p>Can't find license area..</p>
      )}
      <ErrorModal errors={errors} setErrors={setErrors} />
    </>
  )
}

export default CreateServiceArea
