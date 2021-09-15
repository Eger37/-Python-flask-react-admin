import React from 'react'
import {NavLink} from "react-router-dom"

import css from "./MainInfo.module.css"
import {socket} from "./Main";

export default class MainInfo extends React.Component {


    componentDidMount() {
        socket.emit("connect to page", {data: "MainInfo"})
        // socket.on("connect", this.EmitJoinMyRoom)
        // socket.on("disconnect", this.EmitLeaveMyRoom)
    }

    componentWillUnmount() {
        socket.emit("disconnect from page", {data: "MainInfo"})
        // socket.off("connect")
        // socket.off("disconnect")
    }

    render() {
        return (
            <div>HELLO
                <div className={css.rerouting}/>
                <NavLink to={"/rule-page"}>rules</NavLink> &nbsp;|&nbsp;
            </div>
        )
    }
}