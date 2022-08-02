import React, { useState } from "react";

const FadeIn = (timeOut, transition) => {
    class HOC extends React.Component {
        constructor() {
            super()
            this.state = {
                opacity: 0,
                transition: transition
            }
        }

        componentDidMount() {
            //console.log(this.state)
            setTimeout(() => {
                this.setState({opacity: 1})
            }, timeOut);

        }

        render() {
            return (
                <div
                    style={{ 
                        opacity: this.state.opacity,
                        transition: `${this.state.transition}s`
                    }}
                    { ...this.props }
                    >
                </div>
            )
        }
    }
    return HOC
}
export default FadeIn;