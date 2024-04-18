/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address } from '../pages/BookingDetails/interface'

export function generateRandomAlphaNumeric(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }

  return result
}

export const getLatestDate = (sent_at: string, cancelled_at: string, scheduled_at: string) => {
  const args = [
    { sent_at, color: 'success', type: 'Sent' },
    { cancelled_at, color: 'error', type: 'Cancelled' },
    { scheduled_at, color: 'info', type: 'Scheduled' }
  ]
  return args.reduce((greaterDate, item) => {
    if (new Date(Object.values(item)[0]).getTime() > new Date(Object.values(greaterDate)[0]).getTime()) {
      return item
    } else {
      return greaterDate
    }
  })
}

export const generateAddressString = (addressObject: Address) =>
  `${addressObject?.street_name} ${addressObject?.street_number} ${addressObject?.zip_code} ${addressObject?.city}  ${addressObject?.country}`

const checkNullString = (str: string) => (str.trim() === 'null' || !str ? '' : str)

export const decimalTruncate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, decimalSize: number) => {
  const [integerPart, decimalPart] = e.target.value.trim().split('.')
  if (decimalPart && decimalPart.length > 2) {
    e.target.value = `${integerPart}.${decimalPart.slice(0, decimalSize)}`
  }

  return e
}

export function getPatchObject<T>(newObj: T, oldObj: T): Partial<T | void | undefined> {
  const compareObj = (newObj: any, oldObj: any): any => {
    const returnObj: any = {}
    for (const i in newObj) {
      if (typeof newObj[i] === 'object' && newObj[i] !== null && !Array.isArray(newObj[i])) {
        returnObj[i] = compareObj(newObj[i], oldObj[i])
      } else {
        if (newObj[i] !== oldObj[i]) {
          returnObj[i] = oldObj[i]
        }
      }
    }
    return Object.keys(returnObj).length > 0 ? returnObj : undefined
  }

  return compareObj(newObj, oldObj)
}
