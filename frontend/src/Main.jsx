import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import io from "socket.io-client"

// import css from "./Main.module.css"
import MainInfo from "./MainInfo"
import RulePage from "./Rules"
import {getId} from "./auth"
import CF from "./config.json"


let socket = io.connect(`${CF.host}:${CF.server_port}/`)


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        socket.on("connect", () => (socket.emit("give id in start", {end_user_id: getId()})))
        // socket.on("disconnect", () => (socket.emit("test", {id: getId()})))
    }

    componentWillUnmount() {
        socket.off("connect")
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