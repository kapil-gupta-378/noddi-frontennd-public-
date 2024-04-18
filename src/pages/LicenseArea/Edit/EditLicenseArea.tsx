import { useEffect, useState } from 'react'
import SEO from '../../../components/SEO'
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap'
import Heading from '../../../components/Heading'
import LicenseAreaInputs from '../LicenseAreaInputs'
import TimeSlotTemplates, { sortTimeSlotTemplate } from '../Create/TimeSlotTemplates'
import NoddiBreadcrumb from '../../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../../adapters/xhr/axiosPrivate'
import CenterSpinner from '../../../components/CenterSpinner'
import ErrorModal from '../../../components/ErrorModal'
import DrawLicenseAreaMap from '../../../components/Map/DrawArea/DrawLicenseAreaMap'
import { setDifference } from '../../../components/Map/utils'
import { constants } from '../../../constant'
import { getEndpointUrl } from '../../../helper'

const EditLicenseArea = () => {
  const { licenseAreaId } = useParams()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [spinnerMessage, setSpinnerMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)

  const [showCopyModal, setShowCopyModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [existingH3Indexes, setExistingH3Indexes] = useState(new Set())
  const [selectedH3Indexes, setSelectedH3Indexes] = useState(new Set())
  const [selectedMultiPolygons, setSelectedMultiPolygons] = useState([])
  const [licenseArea, setLicenseArea] = useState(null)
  const [licenseAreaName, setLicenseAreaName] = useState('')
  const [existingServiceAreas, setExistingServiceAreas] = useState([])
  const [selectedLicenseCategories, setSelectedLicenseCategories] = useState([])
  const [availableLicenseCategories, setAvailableLicenseCategories] = useState([])
  const [availableOrganizations, setAvailableOrganizations] = useState([])
  const [organization, setOrganization] = useState(null)
  const [timeSlotTemplates, setTimeSlotTemplates] = useState([])

  const fetchData = async () => {
    setSpinnerMessage('Retrieving license area..')
    const {apiEndpoints} = constants
    const licenseAreaUrl: string = getEndpointUrl(apiEndpoints.getLicenseAreaById, {"licenseAreaId": licenseAreaId})
    const licenseCategoriesUrl: string = getEndpointUrl(apiEndpoints.getLicenseCategories)
    const organizationsUrl: string = getEndpointUrl(apiEndpoints.getOrganizations)
    await Promise.all([axiosPrivate.get(licenseAreaUrl), axiosPrivate.get(licenseCategoriesUrl), axiosPrivate.get(organizationsUrl)])
      .then((values) => {
        const licenseAreaData = values[0].data
        setLicenseArea(licenseAreaData)
        setLicenseAreaName(licenseAreaData.name)
        setExistingH3Indexes(new Set(licenseAreaData.h3_indexes))
        setSelectedH3Indexes(new Set(licenseAreaData.h3_indexes))
        setSelectedMultiPolygons(licenseAreaData.multi_polygon)
        setSelectedLicenseCategories(licenseAreaData.license_categories)
        setOrganization(licenseAreaData.organization)
        const tst = licenseAreaData.time_slot_templates
        sortTimeSlotTemplate(tst)
        setTimeSlotTemplates(tst)
        setExistingServiceAreas(licenseAreaData.service_areas)

        const licenseCategoriesData = values[1].data
        setAvailableLicenseCategories(licenseCategoriesData)

        const organizationsData = values[2].data
        setAvailableOrganizations(organizationsData)

        setSpinnerMessage(null)
      })
      .catch((error) => {
        setErrors(error.response.data.errors)
        setSpinnerMessage(null)
        throw Error('An error occurred.')
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSave = () => {
    setSpinnerMessage('Saving license area..')

    const removedH3Indexes = setDifference({
      setA: existingH3Indexes,
      setB: selectedH3Indexes
    })
    const newH3Indexes = setDifference({
      setA: selectedH3Indexes,
      setB: existingH3Indexes
    })

    const url = `/v1/license-areas/id/${licenseAreaId}/update/`
    const formData = new FormData()
    formData.append('name', licenseAreaName)
    formData.append('license_categories', JSON.stringify(selectedLicenseCategories))
    formData.append('organization', JSON.stringify(organization))
    formData.append('removed_h3_indexes', JSON.stringify(Array.from(removedH3Indexes)))
    formData.append('new_h3_indexes', JSON.stringify(Array.from(newH3Indexes)))
    formData.append('multi_polygon', JSON.stringify(selectedMultiPolygons))
    formData.append('time_slot_templates', JSON.stringify(timeSlotTemplates))

    axiosPrivate
      .post(url, formData)
      .then(() => {
        setSpinnerMessage(null)
        navigate(`/license-areas`)
      })
      .catch((error) => {
        setErrors(error.response.data.errors)
        setSpinnerMessage(null)
      })
  }

  const disableSaveButton = () => {
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

  const disableDeleteButton = () => {
    return licenseArea.service_areas.length > 0
  }

  const onDeleteTimeSlotTemplate = ({ timeSlotTemplate }) => {
    setSpinnerMessage(`Deleting time slot template (${timeSlotTemplate.start} - ${timeSlotTemplate.end}), if unused..`)

    const url = `/v1/license-areas/id/${licenseAreaId}/delete-time-slot-template/`
    const formData = new FormData()
    formData.append('time_slot_template', JSON.stringify(timeSlotTemplate))

    axiosPrivate
      .post(url, formData)
      .then(() => {
        setSpinnerMessage(null)
      })
      .catch((error) => {
        setErrors(error.response.data.errors)
        setSpinnerMessage(null)
      })

    setSpinnerMessage(null)
  }

  const CopyLicenseAreaModal = () => {
    const [h3IndexesIsSelected, setH3IndexesIsSelected] = useState(true)
    const [nameIsSelected, setNameIsSelected] = useState(true)
    const [licenseCategoriesIsSelected, setLicenseCategoriesIsSelected] = useState(true)
    const [organizationIsSelected, setOrganizationIsSelected] = useState(true)
    const [timeSlotTemplatesIsSelected, setTimeSlotTemplatesIsSelected] = useState(true)

    return (
      <Modal show={showCopyModal} onHide={() => setShowCopyModal(false)} centered={true} size={'sm'}>
        <Modal.Header closeButton>
          <Modal.Title>Copy License Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <div className={'d-flex'} onClick={() => setH3IndexesIsSelected(!h3IndexesIsSelected)}>
                <Form.Group className={'me-2'}>
                  <Form.Check type={'checkbox'} checked={h3IndexesIsSelected} onChange={() => setH3IndexesIsSelected(!h3IndexesIsSelected)} />
                </Form.Group>
                H3 indexes
              </div>

              <div className={'d-flex'} onClick={() => setNameIsSelected(!nameIsSelected)}>
                <Form.Group className={'me-2'}>
                  <Form.Check type={'checkbox'} checked={nameIsSelected} onChange={() => setNameIsSelected(!nameIsSelected)} />
                </Form.Group>
                License area name
              </div>

              <div className={'d-flex'} onClick={() => setLicenseCategoriesIsSelected(!licenseCategoriesIsSelected)}>
                <Form.Group className={'me-2'}>
                  <Form.Check type={'checkbox'} checked={licenseCategoriesIsSelected} onChange={() => setLicenseCategoriesIsSelected(!licenseCategoriesIsSelected)} />
                </Form.Group>
                License categories
              </div>

              <div className={'d-flex'} onClick={() => setOrganizationIsSelected(!organizationIsSelected)}>
                <Form.Group className={'me-2'}>
                  <Form.Check type={'checkbox'} checked={organizationIsSelected} onChange={() => setOrganizationIsSelected(!organizationIsSelected)} />
                </Form.Group>
                Organization
              </div>

              <div className={'d-flex'} onClick={() => setTimeSlotTemplatesIsSelected(!timeSlotTemplatesIsSelected)}>
                <Form.Group className={'me-2'}>
                  <Form.Check type={'checkbox'} checked={timeSlotTemplatesIsSelected} onChange={() => setTimeSlotTemplatesIsSelected(!timeSlotTemplatesIsSelected)} />
                </Form.Group>
                Time slot templates
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={'secondary'}
            onClick={() => {
              navigate(`/license-areas/create`, {
                state: {
                  ...(h3IndexesIsSelected && { selectedH3Indexes }),
                  ...(nameIsSelected && { licenseAreaName }),
                  ...(licenseCategoriesIsSelected && {
                    selectedLicenseCategories
                  }),
                  ...(organizationIsSelected && { organization }),
                  ...(timeSlotTemplatesIsSelected && { timeSlotTemplates })
                }
              })
            }}
          >
            Copy
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const DeleteLicenseAreaModal = () => {
    return (
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered={true} size={'sm'}>
        <Modal.Header closeButton>
          <Modal.Title>Delete License Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {disableDeleteButton() ? (
            <p className={'mb-0'}>You need to delete all connected service areas in order to delete this license area.</p>
          ) : (
            <p className={'mb-0'}>Are you sure you want to delete this license area?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={'danger'}
            disabled={disableDeleteButton()}
            onClick={() => {
              setSpinnerMessage('Deleting license area..')
              const url = `/v1/license-areas/id/${licenseAreaId}/delete/`
              axiosPrivate
                .delete(url)
                .then(() => {
                  setSpinnerMessage(null)
                  navigate(`/license-areas`)
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
        <Dropdown.Item onClick={() => setShowCopyModal(true)}>Copy</Dropdown.Item>
        <Dropdown.Item onClick={() => setShowDeleteModal(true)}>Delete</Dropdown.Item>
      </DropdownButton>
    )
  }

  return spinnerMessage ? (
    <CenterSpinner text={spinnerMessage} />
  ) : (
    <>
      <SEO title={'Edit license area'} />
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
            title: 'Edit'
          }
        ]}
      />

      {licenseArea ? (
        <>
          <Heading text={`Edit ${licenseAreaName}`} button={OptionsButton()} />
          <CopyLicenseAreaModal />
          <DeleteLicenseAreaModal />

          <DrawLicenseAreaMap
            selectedH3Indexes={selectedH3Indexes}
            setSelectedH3Indexes={setSelectedH3Indexes}
            selectedMultiPolygons={selectedMultiPolygons}
            setSelectedMultiPolygons={setSelectedMultiPolygons}
            existingServiceAreas={existingServiceAreas}
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
          <Button variant={'primary'} onClick={onSave} disabled={disableSaveButton()}>
            Save
          </Button>
        </>
      ) : (
        <p>Can't find license area..</p>
      )}
      <ErrorModal errors={errors} setErrors={setErrors} />
    </>
  )
}

export default EditLicenseArea
