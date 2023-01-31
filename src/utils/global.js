// --------------Validate Image File----------------------

export const validImageTypes =  ['png','jpg','jpeg','webp']

// used in input file
export const accept = ".jpg,.png,.jpeg,.webp" 

export const checkImageFormat = ({fileName}) => {
     const type =  fileName.split('.').pop();
     // Valid image Formats
     const valid = ['png','jpg','jpeg','webp']
     if(!valid.includes(type.toLocaleLowerCase())){
          return false
     }
     return true
}

// --------------Class Name----------------------

export const buttonClassName = ({ bgColor , isValid , isOutline}) => {
     if(isOutline){
          return `shadow-${bgColor}-300 focus:ring-2  ring-green-600 ring-offset-2 shadow-sm md:shadow-md  lg:shadow-lg ${isValid ? ` hover:bg-${bgColor}-200 bg-${bgColor}-100 border border-${bgColor}-600 text-${bgColor}-800 cursor-pointer` : "ring-gray-400 cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-2 px-6 font-sans  text-sm rounded-md`
     }else{
          return `focus:ring-2 shadow-${bgColor}-400  ring-offset-2 shadow-sm md:shadow-md  lg:shadow-lg ${isValid ? `ring-${bgColor}-400 hover:bg-${bgColor}-700 bg-${bgColor}-600 border   text-white cursor-pointer ` : "ring-gray-400 cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-2 px-6 font-sans  text-sm rounded-md`
     }
}

export const linkClassName =  ({ bgColor , isOutline}) => {
     if(isOutline) {
          return `shadow-${bgColor}-300 focus:ring-2  ring-offset-2 shadow-sm md:shadow-md  lg:shadow-lg ring-${bgColor}-400 hover:bg-${bgColor}-200 bg-${bgColor}-100 border border-${bgColor}-600 text-${bgColor}-800 cursor-pointer py-2 px-6 font-sans  text-sm rounded-md`
     }else{
          return `focus:ring-2 shadow-${bgColor}-400 ring-offset-2 shadow-sm md:shadow-md  lg:shadow-lg  ring-${bgColor}-600 hover:bg-${bgColor}-700 bg-${bgColor}-600 border   text-white cursor-pointer  py-2 px-6 font-sans  text-sm rounded-md`
     }
}

// -----------------Title Substring---------------------

export const substringHandler = ({title , count}) => title.length > count ? title.substring( 0 , count) + "..." : title 

// --------------------------

export const removeNullInArray = array => array.filter(element => {return element !== null});

export const removeHyphen = text => text.replace(/-/g, ' ');