const returnSubcategory = (name) => {
    if(category){
        if(similarCategories && similarCategories.name === name){
            return { 
                mainName : similarCategories.name, 
                text:"دسته های پیشنهادی",
                data : similarCategories.sub_categories
            }
        }
        if(similarCategories && !similarCategories.sub_categories.name){
            return{
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : category,
                text:"دسته های مشابه",
                data : [{name : "زیر دسته ایی وجود ندارد" , status : false}]
            }
        }
         else if(similarCategories && similarCategories.sub_categories.name === name){
            return {
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                text:"دسته های مشابه",
                data :  similarCategories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories
            }
        }else if(similarCategories && similarCategories.sub_categories.sub_categories.name === name){
            return {
                type : "sub_sub",
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : similarCategories.sub_categories.sub_categories.name,
                text:"دسته‌بندی دقیق‌تر",
                data :  similarCategories.sub_categories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories.sub_categories
            }
        }
        const sub_sub_sub =  similarCategories && similarCategories.sub_categories.sub_categories.sub_categories  && similarCategories.sub_categories.sub_categories.sub_categories.find(e => e.name === category)
        if(sub_sub_sub){
            return {
                type : "sub_sub_sub",
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : similarCategories.sub_categories.sub_categories.name,
                text: "دسته‌بندی دقیق‌تر",
                data :  similarCategories.sub_categories.sub_categories.sub_categories 
            }
        }
        else if(!sub_sub_sub && similarCategories){
            return {
                type : "sub_sub_sub",
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : similarCategories.sub_categories.sub_categories.name,
                text:"دسته های مشابه",
                data :  similarCategories.sub_categories.sub_categories 
            }
        }
    }
    return false
}