import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fade_in } from "../fade_in";
import session from "../method/storage";
import SocketIO from "../socketIo";
import { check_and_recatch_data } from "../method/method_func";
import { select_route } from "../api";
const Title=({sidebar_arr, synchronize_update})=>{
    const {page} = useParams()
    const permession = session.getItem('permession')
    const navigate = useNavigate()
    const [style_opacity, set_style_opacity] = useState({opacity:0,transition:''})
    const [slideIn, setSlideIn] = useState(-200);

    useEffect(()=>{
        fade_in(style_opacity,set_style_opacity, 300, '1s')
    },[])

    useEffect(() => {
        if (session.getItem('slideIn') === 1) setSlideIn(0);
        SocketIO.action().then((instance) => instance.mainOnListen(setSlideIn))
        //SocketIO.instance.mainOnListen(setSlideIn)
    }, [])


    const navigation = () => select_route(navigate)

    return(
        <Fragment>
            <div style={style_opacity} onClick={()=>{navigate(`/backend/${permession}/${sidebar_arr[0]}`)}}
                 className="title">
            </div>
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