import React from 'react'
import css from "./Rules.module.css"
import {NavLink} from "react-router-dom";
import {socket} from "./Main";
import {getId} from "./auth";

export default class RulePage extends React.Component {
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
            <div className={css.box}>
                <NavLink to={"/"}>
                    <div className={css.reroutingButton}>
                        main
                    </div>
                </NavLink>
            </div>
        )
    }
}