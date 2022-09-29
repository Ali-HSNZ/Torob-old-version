import PersianDate from "@alireza-ab/persian-date"
import { toEnDigits, toPersianDigits } from "./toPersianDigits"

export function timeDifference(time){
    const date = new Date(time*1000)
    const toPersianDate = date.toLocaleDateString("fa-IR")
    const year = toPersianDate.split('/')[0]
    const month = toPersianDate.split('/')[1]
    const day = toPersianDate.split('/')[2]
    const splitDate = toEnDigits(`${year}/${month}/${day}`)
    let dateNow = new PersianDate(null)
    return toPersianDigits(dateNow.diffForHumans( splitDate , false))
}