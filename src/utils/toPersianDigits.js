

export const toPersianDigits = (requestDigits) => {
	const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']
	return  requestDigits.toString().replace(/\d/g , (e) => persianDigits[parseInt(e)])

}