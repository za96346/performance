import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { select_route } from "./api"


const Blank = () => {
    const navigate = useNavigate()
    useEffect(() => {
        select_route(navigate)   
    })
    return(
        <>
        </>
    )
}
export default Blank