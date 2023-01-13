import moment from 'moment'

export const momentFormat = (date: Date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
}

export const isValid = (val: any, extra = null) => {
  let r = true
  if (val === null) {
    r = false
  } else if (val === undefined) {
    r = false
  } else if (val === '') {
    r = false
  } else if (val === extra) {
    r = false
  } else if (val === 'null') {
    r = false
  }
  return r
}

export const isValidArray = (val: any) => {
  if (isValid(val)) {
    if (typeof val === 'object') {
      return val?.length > 0
    }
  }
  return false
}


