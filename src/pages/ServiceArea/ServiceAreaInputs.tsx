import { Col, Form, Row } from 'react-bootstrap'

const ServiceAreaInputs = ({ serviceAreaName, setServiceAreaName, licenseCategories, licenseArea }) => {
  return (
    <Form className={'mt-3'}>
      <Row>
        <Col sm={4}>
          <Form.Group className={'mb-3'} controlId={'formAreaName'}>
            <Form.Label>Service area name</Form.Label>
            <Form.Control type={'text'} placeholder={'Enter service area name'} value={serviceAreaName} onChange={(e) => setServiceAreaName(e.target.value)} />
          </Form.Group>
        </Col>

        <Col sm={4}>
          <Form.Group className={'mb-3'} controlId={'formServiceProduct'}>
            <Form.Label>License categories</Form.Label>
            <Form.Control type={'text'} value={licenseCategories.join(', ')} disabled={true} />
            {/*<Form.Select disabled={true}>*/}
            {/*    <option>{licenseCategories.join(", ")}</option>)*/}
            {/*</Form.Select>*/}
          </Form.Group>
        </Col>

        <Col sm={4}>
          <Form.Group className={'mb-3'} controlId={'formLicenseArea'}>
            <Form.Label>License area</Form.Label>
            <Form.Control type={'text'} value={licenseArea.name} disabled={true} />
            {/*<Form.Select disabled={true}>*/}
            {/*    <option>{licenseArea.name}</option>)*/}
            {/*</Form.Select>*/}
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default ServiceAreaInputs
