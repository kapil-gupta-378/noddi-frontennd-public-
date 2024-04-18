import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import { dateToDdMmYyyyDashes } from '../../utils'
import { forwardRef } from 'react'
import { BsCalendar3 } from 'react-icons/bs'

const NoddiDatePicker = ({ date, setDate }) => {
  const navigate = useNavigate()

  const CustomInput = forwardRef((props, ref) => {
    return (
      <div onClick={props.onClick} className={'form-control'} style={{ width: '253px' }}>
        <BsCalendar3 className={'me-2'} style={{ marginBottom: '2px' }} />
        <label ref={ref}>{props.value || props.placeholder}</label>
      </div>
    )
  })

  return (
    <DatePicker
      selected={date}
      onChange={(date) => {
        navigate(`/${dateToDdMmYyyyDashes(date)}`, { replace: false })
        setDate(date)
      }}
      showIcon
      dateFormat={'MMMM d, yyyy'}
      customInput={<CustomInput />}
    />
  )
}

export default NoddiDatePicker
