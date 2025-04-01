import Header from "../components/Header"
import { useParams } from "react-router-dom"
const BoardPage = ()=>{

    const { boardType} = useParams();
    console.log("디버그")
    console.log(boardType)

   

    return(
        <div className="BoardPage">
            <Header title={boardType} />

            <div>



                
            </div>
        </div>
    )


}

export default BoardPage