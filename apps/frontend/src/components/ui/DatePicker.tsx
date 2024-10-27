import { DateView } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Dayjs } from 'dayjs'

interface Props {
  className?: string
  label?: React.ReactNode
  views?: DateView[]
  value?: Dayjs | null
  onChange?: (value: Dayjs | null) => void
  shouldDisableDate?: (value: Dayjs) => boolean
}

function CustomDatePicker(props: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          className={props.className}
          label={props.label}
          views={props.views}
          defaultValue={props.value}
          onChange={props.onChange}
          shouldDisableDate={props.shouldDisableDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default CustomDatePicker
