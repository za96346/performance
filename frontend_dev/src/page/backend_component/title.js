import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FadeIn from "../Hoc/fade_in";
import session from "../method/storage";
import SocketIO from "../socketIo";
import { check_and_recatch_data } from "../method/method_func";
import { select_route } from "../api";

const Fade = FadeIn(300, 1)
const Title=({sidebar_arr, synchronize_update})=>{
    const permession = session.getItem('permession')
    const navigate = useNavigate()
    const [slideIn, setSlideIn] = useState(-200);

    useEffect(() => {
        if (session.getItem('slideIn') === 1) setSlideIn(0);
        SocketIO.action().then((instance) => instance.mainOnListen(setSlideIn))
    }, [])


    const navigation = () => {
        navigate('/access====>error')
    }

    return(
        <Fragment>
            <Fade onClick={() => {navigate(`/backend/${permession}/${sidebar_arr[0]}`)}}
                 className="title">
            </Fade>
            <div 
                onClick={() => {
                    check_and_recatch_data(session.getItem('token'), synchronize_update, 1500, navigation)
                    setSlideIn(-200)
                    session.setItem('slideIn', '0')
                }}
                style={{right: slideIn}} 
                className={'slideIn'}>有可用更新</div>

        </Fragment>
    )
}
export default Title;