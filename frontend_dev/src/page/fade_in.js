import React, { useState } from "react";

export function fade_in(style, set_style, time, transition){
    const timer = setTimeout(() => {
        set_style({ ...style, opacity: 1, transition: transition })
    }, time);
}

const fade = (component) => {
    const [style_opacity, set_style_opacity] = useState({opacity:0,transition:''})
    class HOC extends React.Component {
        render() {
            return (
                <component>

                </component>
            )
        }
    }
    return HOC
}
export default fade;