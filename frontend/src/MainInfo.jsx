import React from 'react'
import {NavLink} from "react-router-dom"

import css from "./MainInfo.module.css"
import {socket} from "./Main";
import {getId} from "./auth";

export default class MainInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {url: window.location.href}
    }

    componentDidMount() {
        socket.emit("connect to page", {id: getId(), url: this.state.url})
    }

    componentWillUnmount() {
        // socket.emit("disconnect from page", {id: getId(), url: this.state.url})
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