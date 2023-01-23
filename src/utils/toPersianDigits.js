export const toPersianDigits = (requestDigits) => {
	const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']
	return requestDigits !== undefined ? requestDigits.toString().replace(/\d/g , (e) => persianDigits[parseInt(e)]) : ""
}

var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];

export const toEnDigits = (str) => {
  if(typeof str === 'string'){
    for(var i=0; i<10; i++){
		str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
	}
  }
  return str;
};