import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import { BsExclamationCircle, BsFillCheckCircleFill, BsPencilFill } from 'react-icons/bs'
import { useState } from 'react'
import { isHourMinuteFormat } from '../../../utils'

const toDate = (timeString) => {
  const now = new Date()
  now.setHours(timeString.substring(0, timeString.indexOf(':')))
  now.setMinutes(timeString.substring(timeString.indexOf(':') + 1))
  now.setSeconds(0)
  return now
}

export const sortTimeSlotTemplate = (timeSlotTemplatesToSort) => {
  timeSlotTemplatesToSort.sort((a, b) => toDate(a.start) - toDate(b.start) || toDate(a.end) - toDate(b.end))
}

const TimeSlotTemplates = ({ timeSlotTemplates, setTimeSlotTemplates, onDeleteTimeSlotTemplate }) => {
  const ExistingTableRowContent = ({ timeSlotTemplate }) => {
    return (
      <tr>
        <td>{timeSlotTemplate.start}</td>
        <td>{timeSlotTemplate.end}</td>
        <td>
          <Button variant={'danger'} size={'sm'} className={'w-100 p-0'} onClick={() => onDeleteTimeSlotTemplate({ timeSlotTemplate })}>
            Delete
          </Button>
        </td>
      </tr>
    )
  }

  const NewTableRow = () => {
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [startIcon, setStartIcon] = useState(<BsPencilFill />)
    const [endIcon, setEndIcon] = useState(<BsPencilFill />)

    const disableAddButton = () => {
      // Check that start time is in HH:MM format
      const validStart = isHourMinuteFormat(start)
      if (!validStart) return true

      // Check that end time is in HH:MM format
      const validEnd = isHourMinuteFormat(end)
      if (!validEnd) return true

      // Check that end > start
      if (start >= end) return true

      // Check that the given time slot template does not already exist
      const alreadyExists = timeSlotTemplates.find((v) => v.start === start && v.end === end)
      if (alreadyExists) return true

      return false
    }

    const validateHourMinuteStr = ({ value, setIcon }) => {
      const isValid = isHourMinuteFormat(value)
      if (value === '') {
        setIcon(<BsPencilFill />)
      } else if (isValid) {
        setIcon(<BsFillCheckCircleFill style={{ color: 'green' }} />)
      } else {
        setIcon(<BsExclamationCircle style={{ color: 'red' }} />)
      }

      return isValid
    }

    const onSubmit = () => {
      const newTimeSlotTemplates = [...timeSlotTemplates, { start, end }]
      sortTimeSlotTemplate(newTimeSlotTemplates)
      setTimeSlotTemplates(newTimeSlotTemplates)
    }

    return (
      <tr>
        <td>
          <InputGroup className='mb-3'>
            <Form.Control
              type={'text'}
              placeholder={'Slot start (hh:mm)'}
              maxLength={'5'}
              value={start}
              onChange={(e) => {
                validateHourMinuteStr({
                  value: e.target.value,
                  setIcon: setStartIcon
                })
                setStart(e.target.value)
              }}
            />
            <InputGroup.Text>{startIcon}</InputGroup.Text>
          </InputGroup>
        </td>
        <td>
          <InputGroup className='mb-3'>
            <Form.Control
              type={'text'}
              placeholder={'Slot end (hh:mm)'}
              maxLength={'5'}
              value={end}
              onChange={(e) => {
                validateHourMinuteStr({
                  value: e.target.value,
                  setIcon: setEndIcon
                })
                setEnd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !disableAddButton()) onSubmit()
              }}
            />
            <InputGroup.Text>{endIcon}</InputGroup.Text>
          </InputGroup>
        </td>
        <td>
          <Button variant={'success'} size={'sm'} disabled={disableAddButton()} className={'w-100 p-0'} style={{ height: '38px' }} onClick={onSubmit}>
            Add
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Slot start</th>
          <th>Slot end</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* Already added slot templates */}
        {timeSlotTemplates.map((timeSlotTemplate, index) => {
          return <ExistingTableRowContent key={index} timeSlotTemplate={timeSlotTemplate} />
        })}

        {/* Add new slot template */}
        <NewTableRow />
      </tbody>
    </Table>
  )
}

export default TimeSlotTemplates
