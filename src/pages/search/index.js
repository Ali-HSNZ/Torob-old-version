import Layout from "@/layout/Layout";
import { useRouter } from "next/router";

const SearchQuery = () => {
    const router = useRouter()
    const text = router.query
    console.log(text);

    return (  
        <Layout>
            <h1>index</h1>
        </Layout>
    );
}
 
export default SearchQuery;