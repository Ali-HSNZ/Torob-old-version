export const ONLY_DIGIT_REGIX = /^\d+$/;
export const PHONE_NUMBER_REGIX = /^(?:98|\+98|0098|0)?9[0-9]{9}$/
export const POSTAL_CODE_REGIX = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/;
export const PASSWORD_REGIX =/^[A-Za-z0-9]*$/
export const ONLY_PERSIAN_ALPHABET = /^[\u0600-\u06FF\s]+$/