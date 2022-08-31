    <section className="flex gap-x-6 font-sans text-sm text-gray-500">
    {
        data&&data.data.map((category,index) => {
            return(
                <nav className="flex gap-x-4" key={index}>
                    <a  className="hover:text-blue-500  cursor-pointer" onClick={()=> showCategory(category.id)}>{category.name}</a>
                   <div className={`${category.status ? "" : "hidden"}`}>
                        { category.sub_categories.length > 0 && category.sub_categories.map(sub => {
                                return(
                                    <>
                                        <div className="flex gap-x-4  relative top-11">
                                            <a className="hover:text-red-500  cursor-pointer" onClick={()=> setCurrentCategory(category)}>{sub.name}</a>
                                        </div>
                                        {sub.sub_categories.length > 0 && sub.sub_categories.map(e => {
                                            return(
                                            <div className="flex gap-x-4  relative top-24">
                                                <a className="hover:text-red-500  cursor-pointer" onClick={()=> setCurrentCategory(category)}>{e.name}</a>
                                            </div>
                                            )
                                        })
                                        }
                                    </>
                                )
                            }

                            )}
                   </div>

                </nav>
            )
        })
    }

   {/* {
        currentCategory && (
            <div  className={`absolute px-6 top-16 left-0 right-0 w-full`}>
            <div className="bg-white p-4 group-active:bg-blue-300 w-full h-auto">
                <ul className="flex gap-x-6">
                    {render(currentCategory).data.map((e,index) => {
                            return(
                                <p key={index}>{e}</p>
                            )
                        })
                    }
            </ul>
        </div>
    </div>
        )
   } */}

</section>
