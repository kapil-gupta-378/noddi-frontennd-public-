export const flatten = (arr, depth = 1) => {
  if (depth === 1) {
    return flattenArr(arr)
  }

  const res = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res.push(flatten(arr[i], depth - 1))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

const flattenArr = (arr) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flattenArr(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

export const isHourMinuteFormat = (str) => {
  return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(str)
}

export const iso8601ToHhMm = (iso8601String) => {
  const date = new Date(iso8601String)
  return date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0')
}

export const dateToDdMmYyyyDashes = (date) => {
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1 // Months start at 0!
  let dd = date.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return dd + '-' + mm + '-' + yyyy
}

export const dateToDdMmYyyySlashes = (date) => {
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1 // Months start at 0!
  let dd = date.getDate()

  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm

  return dd + '/' + mm + '/' + yyyy
}

export const floorToHour = (date) => {
  const p = 60 * 60 * 1000 // milliseconds in an hour
  return new Date(Math.floor(date.getTime() / p) * p)
}

export const ceilToHour = (date) => {
  const p = 60 * 60 * 1000 // milliseconds in an hour
  return new Date(Math.ceil(date.getTime() / p) * p)
}

export const dateToHhMM = (date) => {
  let hh = date.getUTCHours()
  let mm = date.getUTCMinutes()
  if (hh < 10) hh = '0' + hh
  if (mm < 10) mm = '0' + mm
  return hh + ':' + mm
}

export const addHoursToDate = (date, num_hours) => {
  date.setTime(date.getTime() + num_hours * 60 * 60 * 1000)
  return date
}
