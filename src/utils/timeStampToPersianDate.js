export const timeStampToPersianDate =(timestamp) => {
    return new Date(timestamp).toLocaleDateString('fa-IR');
}
