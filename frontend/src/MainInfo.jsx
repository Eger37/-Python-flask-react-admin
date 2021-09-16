import React from 'react'
import {NavLink} from "react-router-dom"

import css from "./MainInfo.module.css"
import {socket} from "./Main";
import {getId} from "./auth";

export default class MainInfo extends React.Component {


    componentDidMount() {
        socket.emit("connect to page", {id: getId(), url: window.location.href})
    }

    componentWillUnmount() {
        socket.emit("disconnect from page", {id: getId(), url: window.location.href})
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