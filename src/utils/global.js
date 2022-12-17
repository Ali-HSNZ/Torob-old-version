export const validImageTypes =  ['png','jpg','jpeg','webp']
export const  removeNullInArray = array => array.filter(element => {return element !== null});
export const removeHyphen = text => text.replace(/-/g, ' ');