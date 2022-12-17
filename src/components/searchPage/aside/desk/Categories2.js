const Categories2 = () => {
    const data = {
        status: 200,
        message: "OK",
        data: {
            id: 1,
            name: "وسایل الکترونیکی",
            slug: "osayl-alktronyky",
            parent_id: null,
            sub_categories: {
                id: 3,
                name: "کتاب",
                slug: "کتاب",
                parent_id: 1,
                sub_categories: {
                    id: 17,
                    name: "کتاب جدید 1",
                    slug: "کتاب-جدید-1",
                    parent_id: 3,
                    sub_categories: [
                        {
                            id: 18,
                            name: "کتاب11",
                            slug: "کتاب11",
                            parent_id: 17,
                        }
                    ],
                },
            },
        }
    }



    function objMap(obj, func) {
        // func meens "function"

        for (const index in obj) {
            if(obj[index] === 'وسایل الکترونیکی'){
                console.log(obj);
            }
            
        }
      }
      objMap(data)
    return ( 
        <section>
            as
            {/* {datasub_categoriesmap((category , index) => {
                <p>{category.name}</p>
            })} */}
        </section>
    );
}
 
export default Categories2;