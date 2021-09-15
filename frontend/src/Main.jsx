import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import io from "socket.io-client"

// import css from "./Main.module.css"
import {getAccessToken} from "./auth"
import MainInfo from "./MainInfo"
import RulePage from "./Rules"

let socket = io.connect("localhost:5000/")


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    // EmitJoinMyRoom = () => {
    //     socket.emit("join my room", getAccessToken())
    // }
    //
    // EmitLeaveMyRoom = () => {
    //     socket.emit("leave my room", getAccessToken())
    // }

    componentDidMount() {
        // socket.on("connect", this.EmitJoinMyRoom)
        // socket.emit("connect to page", {data: "llll"})
        // socket.on("disconnect", this.EmitLeaveMyRoom)
    }

    componentWillUnmount() {
        // socket.emit("disconnect from page", {data: "llll"})

        // socket.off("connect")
        // socket.off("disconnect")
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