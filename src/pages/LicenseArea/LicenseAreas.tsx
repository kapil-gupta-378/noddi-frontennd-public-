import CenterSpinner from '../../components/CenterSpinner'
import SEO from '../../components/SEO'
import { Button, Card } from 'react-bootstrap'
import NoddiBreadcrumb from '../../components/Breadcrumb'
import Heading from '../../components/Heading'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorModal from '../../components/ErrorModal'
import { BsPencilSquare, BsPlusLg } from 'react-icons/bs'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'

const LicenseAreas = () => {
  const axiosPrivate = useAxiosPrivate()
  const [spinnerMessage, setSpinnerMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)

  const [licenseAreas, setLicenseAreas] = useState(null)

  const fetchData = async () => {
    setSpinnerMessage('Retrieving license areas..')
    const {apiEndpoints} = constants;
    const licenseAreasUrl: string = getEndpointUrl(apiEndpoints.getLicenseAreasOld)
    Promise.all([axiosPrivate.get(licenseAreasUrl)])
      .then((values) => {
        const licenseAreasData = values[0].data
        licenseAreasData.sort((a, b) => a.name.localeCompare(b.name))
        setLicenseAreas(licenseAreasData)
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

  return (
    <>
      <SEO title={'License areas'} />
      {spinnerMessage ? (
        <CenterSpinner text={spinnerMessage} />
      ) : (
        <>
          <NoddiBreadcrumb
            items={[
              {
                title: 'Home',
                path: '/'
              },
              {
                title: 'License areas',
                path: '/license-areas'
              }
            ]}
          />

          <Heading
            text={'License areas'}
            button={
              <Button variant={'success'} size={'sm'} as={Link} to={`/license-areas/create`} className={'rounded-4 px-3'}>
                <BsPlusLg className={'me-2 mb-1'} />
                Add new license area
              </Button>
            }
          />

          {licenseAreas ? (
            <>
              {licenseAreas.map((licenseArea, index) => {
                return (
                  <Card key={index} className={'mb-3'}>
                    <Card.Header className={'py-2'}>
                      <div className={'d-sm-flex justify-content-between'}>
                        <h5 className={'mb-0 mt-2'}>{licenseArea.name}</h5>
                        <Button variant={'outline-secondary'} size={'sm'} as={Link} to={`/license-areas/${licenseArea.id}`} className={'rounded-4 px-3'}>
                          <BsPencilSquare className={'me-2 mb-1'} />
                          Edit
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body className={'pt-2'}>
                      {licenseArea.service_areas.length > 0 ? (
                        licenseArea.service_areas.map((serviceArea, saIndex) => {
                          return (
                            <Button
                              variant={'secondary'}
                              size={'sm'}
                              key={saIndex}
                              as={Link}
                              to={`/license-areas/${licenseArea.id}/service-areas/${serviceArea.id}`}
                              className={'me-2 mt-2 rounded-4 px-3'}
                            >
                              {serviceArea.name}
                            </Button>
                          )
                        })
                      ) : (
                        <small className={'mt-1'}>No service areas exists for this license area yet...</small>
                      )}

                      <div>
                        <Button variant={'success'} size={'sm'} as={Link} to={`/license-areas/${licenseArea.id}/service-areas/create`} className={'mt-2 rounded-4 px-3'}>
                          <BsPlusLg className={'me-2 mb-1'} />
                          Add new service area
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                )
              })}
            </>
          ) : (
            <p className={'mt-1'}>No license areas exists..</p>
          )}
          <ErrorModal errors={errors} setErrors={setErrors} />
        </>
      )}
    </>
  )
}

export default LicenseAreas
