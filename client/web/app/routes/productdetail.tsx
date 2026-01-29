import { useParams } from "react-router";

export default function ProductDetailPage(){
    const {id} = useParams();
    console.log(id)
    return (
        <div>
            {id}
        </div>
    )
}