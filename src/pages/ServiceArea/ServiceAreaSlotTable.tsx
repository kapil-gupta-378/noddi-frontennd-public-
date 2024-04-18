import { Form, Table } from 'react-bootstrap'
import { useState } from 'react'
import { Days } from "../../types/common";

const ServiceAreaSlotTable = ({ timeSlotTemplates, setTimeSlotTemplates }) => {
  const DataRow = ({ timeSlotTemplate, index }) => {
    const onMondayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.monday_enabled = enabled
      if (price !== null) newObject.monday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    const onTuesdayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.tuesday_enabled = enabled
      if (price !== null) newObject.tuesday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    const onWednesdayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.wednesday_enabled = enabled
      if (price !== null) newObject.wednesday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    const onThursdayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.thursday_enabled = enabled
      if (price !== null) newObject.thursday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    const onFridayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.friday_enabled = enabled
      if (price !== null) newObject.friday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    const onSaturdayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.saturday_enabled = enabled
      if (price !== null) newObject.saturday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    const onSundayChange = ({ enabled, price }) => {
      const newTimeSlotTemplates = [...timeSlotTemplates]
      const newObject = newTimeSlotTemplates.find((v) => v.id === timeSlotTemplate.id)
      if (enabled !== null) newObject.sunday_enabled = enabled
      if (price !== null) newObject.sunday_price = price
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    return (
      <tr key={index}>
        {/*Slot time*/}
        <td style={{ minWidth: '117px' }}>
          {timeSlotTemplate.start} - {timeSlotTemplate.end}
        </td>

        {/*Monday*/}
        <DataCell key={`monday-${index}`} defaultIsChecked={timeSlotTemplate.monday_enabled} defaultPrice={timeSlotTemplate.monday_price} onChange={onMondayChange} />

        {/*Tuesday*/}
        <DataCell key={`tuesday-${index}`} defaultIsChecked={timeSlotTemplate.tuesday_enabled} defaultPrice={timeSlotTemplate.tuesday_price} onChange={onTuesdayChange} />

        {/*Wednesday*/}
        <DataCell key={`wednesday-${index}`} defaultIsChecked={timeSlotTemplate.wednesday_enabled} defaultPrice={timeSlotTemplate.wednesday_price} onChange={onWednesdayChange} />

        {/*Thursday*/}
        <DataCell key={`thursday-${index}`} defaultIsChecked={timeSlotTemplate.thursday_enabled} defaultPrice={timeSlotTemplate.thursday_price} onChange={onThursdayChange} />

        {/*Friday*/}
        <DataCell key={`friday-${index}`} defaultIsChecked={timeSlotTemplate.friday_enabled} defaultPrice={timeSlotTemplate.friday_price} onChange={onFridayChange} />

        {/*Saturday*/}
        <DataCell key={`saturday-${index}`} defaultIsChecked={timeSlotTemplate.saturday_enabled} defaultPrice={timeSlotTemplate.saturday_price} onChange={onSaturdayChange} />

        {/*Sunday*/}
        <DataCell key={`sunday-${index}`} defaultIsChecked={timeSlotTemplate.sunday_enabled} defaultPrice={timeSlotTemplate.sunday_price} onChange={onSundayChange} />
      </tr>
    )
  }

  const DataCell = ({ defaultIsChecked, defaultPrice, onChange }) => {
    const [isChecked, setIsChecked] = useState(defaultIsChecked)
    const [price, setPrice] = useState(defaultPrice)

    const onCheckedChange = () => {
      setIsChecked(!isChecked)
      onChange({ enabled: !isChecked, price: null })
    }

    const onPriceChange = (newPrice) => {
      if (newPrice === '') {
        newPrice = 0
      }

      setPrice(newPrice)
      onChange({ enabled: null, price: newPrice })
    }

    return (
      <td
        style={{
          backgroundColor: `${isChecked ? 'rgba(0, 165, 2, 0.2)' : ''}`
        }}
      >
        <Form>
          <div className={'d-flex justify-content-between'} onClick={() => onCheckedChange()}>
            Enable
            <Form.Group controlId={'formChecked'} className={'ms-3'}>
              <Form.Check type={'checkbox'} checked={isChecked} onChange={() => onCheckedChange()} />
            </Form.Group>
          </div>

          <Form.Group controlId={'formPrice'}>
            <Form.Control type={'number'} placeholder={'Price'} defaultValue={price} onBlur={(e) => onPriceChange(e.target.value)} disabled={!isChecked} />
          </Form.Group>
        </Form>
      </td>
    )
  }

  return (
    <Table bordered responsive={true} className={'mt-3'}>
      <thead>
        <tr>
          <th></th>
          {Days.map((day, thIndex) => (
            <th key={thIndex}>{day}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {timeSlotTemplates.length > 0 &&
          timeSlotTemplates.map((timeSlotTemplateServiceArea, index) => {
            return <DataRow key={index} timeSlotTemplate={timeSlotTemplateServiceArea} timeSlotTemplates={timeSlotTemplates} setTimeSlotTemplates={setTimeSlotTemplates} index={index} />
          })}
      </tbody>
    </Table>
  )
}

export default ServiceAreaSlotTable
