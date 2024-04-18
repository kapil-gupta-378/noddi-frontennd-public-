import { useEffect, useState } from 'react'
import SEO from '../../../components/SEO'
import { Button } from 'react-bootstrap'
import Heading from '../../../components/Heading'
import LicenseAreaInputs from '../LicenseAreaInputs'
import TimeSlotTemplates from './TimeSlotTemplates'
import NoddiBreadcrumb from '../../../components/Breadcrumb'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../../adapters/xhr/axiosPrivate'
import CenterSpinner from '../../../components/CenterSpinner'
import ErrorModal from '../../../components/ErrorModal'
import DrawLicenseAreaMap from '../../../components/Map/DrawArea/DrawLicenseAreaMap'
import { constants } from '../../../constant'
import { getEndpointUrl } from '../../../helper'

const CreateLicenseArea = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const axiosPrivate = useAxiosPrivate()
  const [spinnerMessage, setSpinnerMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)

  const [selectedH3Indexes, setSelectedH3Indexes] = useState(new Set())
  const [selectedMultiPolygons, setSelectedMultiPolygons] = useState([])
  const [licenseAreaName, setLicenseAreaName] = useState('')
  const [selectedLicenseCategories, setSelectedLicenseCategories] = useState([])
  const [availableLicenseCategories, setAvailableLicenseCategories] = useState([])
  const [availableOrganizations, setAvailableOrganizations] = useState(null)
  const [organization, setOrganization] = useState(null)
  const [timeSlotTemplates, setTimeSlotTemplates] = useState([])

  const fetchData = async () => {
    setSpinnerMessage('Retrieving data..')
    const {apiEndpoints} = constants
    const licenseCategoriesUrl: string = getEndpointUrl(apiEndpoints.getLicenseCategories)
    const organizationsUrl: string = getEndpointUrl(apiEndpoints.getOrganizations)
    Promise.all([axiosPrivate.get(licenseCategoriesUrl), axiosPrivate.get(organizationsUrl)])
      .then((values) => {
        const licenseCategoriesData = values[0].data
        setAvailableLicenseCategories(licenseCategoriesData)

        const organizationsData = values[1].data
        setAvailableOrganizations(organizationsData)
        setOrganization(organizationsData[0])

        setSpinnerMessage(null)
      })
      .catch((error) => {
        setErrors([error.response.data.errors])
        setSpinnerMessage(null)
      })

    if (location.state) {
      'selectedH3Indexes' in location.state && setSelectedH3Indexes(location.state.selectedH3Indexes)
      'licenseAreaName' in location.state && setLicenseAreaName(location.state.licenseAreaName)
      'selectedLicenseCategories' in location.state && setSelectedLicenseCategories(location.state.selectedLicenseCategories)
      'organization' in location.state && setOrganization(location.state.organization)
      'timeSlotTemplates' in location.state && setTimeSlotTemplates(location.state.timeSlotTemplates)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onCreate = () => {
    setSpinnerMessage('Creating license area..')

    const url = '/v1/license-areas/create/'
    const formData = new FormData()
    formData.append('name', licenseAreaName)
    formData.append('license_categories', JSON.stringify(selectedLicenseCategories))
    formData.append('organization', JSON.stringify(organization))
    formData.append('h3_indexes', JSON.stringify(Array.from(selectedH3Indexes)))
    formData.append('multi_polygon', JSON.stringify(selectedMultiPolygons))
    formData.append('time_slot_templates', JSON.stringify(timeSlotTemplates))

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

  const disableCreateButton = () => {
    if (selectedH3Indexes.size === 0) {
      return true
    } else if (!licenseAreaName.trim()) {
      return true
    } else if (selectedLicenseCategories.length === 0) {
      return true
    } else if (!organization) {
      return true
    } else if (timeSlotTemplates.length === 0) {
      return true
    }

    return false
  }

  const onDeleteTimeSlotTemplate = ({ timeSlotTemplate }) => {
    setSpinnerMessage(`Deleting time slot template (${timeSlotTemplate.start} - ${timeSlotTemplate.end})..`)
    setTimeSlotTemplates(timeSlotTemplates.filter((v) => v.start !== timeSlotTemplate.start && v.end !== timeSlotTemplate.end))
    setSpinnerMessage(null)
  }

  return spinnerMessage ? (
    <CenterSpinner text={spinnerMessage} />
  ) : (
    <>
      <SEO title={'Create area'} />
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
            title: 'Create',
            path: '/license-areas/create'
          }
        ]}
      />
      <Heading text={'Create license area'} />

      {availableLicenseCategories && availableOrganizations ? (
        <>
          <DrawLicenseAreaMap
            selectedH3Indexes={selectedH3Indexes}
            setSelectedH3Indexes={setSelectedH3Indexes}
            selectedMultiPolygons={selectedMultiPolygons}
            setSelectedMultiPolygons={setSelectedMultiPolygons}
            existingServiceAreas={[]}
          />
          <LicenseAreaInputs
            licenseAreaName={licenseAreaName}
            setLicenseAreaName={setLicenseAreaName}
            availableLicenseCategories={availableLicenseCategories}
            selectedLicenseCategories={selectedLicenseCategories}
            setSelectedLicenseCategories={setSelectedLicenseCategories}
            organization={organization}
            setOrganization={setOrganization}
            availableOrganizations={availableOrganizations}
          />
          <TimeSlotTemplates timeSlotTemplates={timeSlotTemplates} setTimeSlotTemplates={setTimeSlotTemplates} onDeleteTimeSlotTemplate={onDeleteTimeSlotTemplate} />
          <Button onClick={onCreate} disabled={disableCreateButton()}>
            Create
          </Button>
        </>
      ) : (
        <p className={'mt-1'}>No license categories and organizations found..</p>
      )}
      <ErrorModal errors={errors} setErrors={setErrors} />
    </>
  )
}

export default CreateLicenseArea
