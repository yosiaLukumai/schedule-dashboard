import { date } from 'quasar'
export const timestamp = () =>  Date.now()


export const currentDate =  () =>  date.formatDate(timestamp(), 'YYYY-MM-DD HH:mm')
export const newdate = (hours ,  minutes) => {
return date.formatDate(date.buildDate({year: 2022, month: 12, date: 1, hours: hours, minutes: minutes}), 'YYYY-MM-DD HH:mm')
}