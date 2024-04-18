import { Col, Form, Row } from 'react-bootstrap'
import Select from 'react-select'

const LicenseAreaInputs = ({
  licenseAreaName,
  setLicenseAreaName,
  availableLicenseCategories,
  selectedLicenseCategories,
  setSelectedLicenseCategories,
  organization,
  setOrganization,
  availableOrganizations
}) => {
  const selectedOptions = selectedLicenseCategories.map((name) => {
    return { value: name, label: name }
  })

  const selectOptions = availableLicenseCategories.map((name) => {
    return { value: name, label: name }
  })

  return (
    <Form className={'mt-3'}>
      <Row>
        <Col sm={4}>
          <Form.Group className={'mb-3'} controlId={'formAreaName'}>
            <Form.Label>License area name</Form.Label>
            <Form.Control type={'text'} placeholder={'Enter license area name'} value={licenseAreaName} onChange={(e) => setLicenseAreaName(e.target.value)} />
          </Form.Group>
        </Col>

        <Col sm={4}>
          <Form.Group className={'mb-3'} controlId={'formLicenseCategories'}>
            <Form.Label>License categories</Form.Label>
            <Select
              options={selectOptions}
              isMulti
              value={selectedOptions}
              onChange={(values) => {
                const selectedOptions = values.map((val) => val.value)
                setSelectedLicenseCategories(selectedOptions)
              }}
            />
          </Form.Group>
        </Col>

        <Col sm={4}>
          <Form.Group className={'mb-3'} controlId={'formAreaName'}>
            <Form.Label>Organization</Form.Label>
            <Form.Select
              defaultValue={organization.id}
              onChange={(e) => {
                const selectedOrganization = availableOrganizations.find((element) => element.id === e.target.value)
                setOrganization(selectedOrganization)
              }}
            >
              {availableOrganizations.map((availableOrganization, index) => {
                return (
                  <option key={index} value={availableOrganization.id}>
                    {availableOrganization.name}
                  </option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default LicenseAreaInputs
