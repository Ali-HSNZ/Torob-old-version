export const timeStampToPersianDate =(timestamp) => {
    return new Date(timestamp*1000).toLocaleDateString('fa-IR');
}
export const timeStampToPersianTime =(timestamp) => {
    return new Date(timestamp*1000).toLocaleTimeString('fa-IR');
}
