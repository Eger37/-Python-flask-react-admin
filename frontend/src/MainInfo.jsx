import React from 'react'
import {NavLink} from "react-router-dom"

import css from "./MainInfo.module.css"

export default class MainInfo extends React.Component {
    render() {
        return (
            <div>HELLO
                <div className={css.rerouting}/>
                <NavLink to={"/rule-page"}>rules</NavLink> &nbsp;|&nbsp;
            </div>
        )
    }
}