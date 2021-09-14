import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import {getAnyAccessToken} from "./auth"
import {io} from "socket.io-client"

import css from "./Main.module.css"
import MainInfo from "./MainInfo"
import RulePage from "./Rules"

// let socket = socketIOClient("http://lacalhost:5000/")
let socket = io.connect("http://lacalhost:5000/")


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    EmitJoinMyRoom = () => {
        socket.emit("join my room", getAnyAccessToken())
    }

    EmitLeaveMyRoom = () => {
        socket.emit("leave my room", getAnyAccessToken())
    }

    componentDidMount() {
        socket.on("connect", this.EmitJoinMyRoom)
        socket.on("disconnect", this.EmitLeaveMyRoom)
    }

    componentWillUnmount() {
        socket.off("connect")
        socket.off("disconnect")
    }

    render() {
        return (
            <div className="in-body">
                <BrowserRouter>
                    <div className="wrapper">
                        <div className="inner-variable-field">
                            <Route exact path={"/"} component={MainInfo}/>
                            <Route exact path={"/rule-page"} component={RulePage}/>
                        </div>

                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export {Main, socket}