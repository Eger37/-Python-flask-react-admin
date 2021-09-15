import React from 'react'
import css from "./Rules.module.css"
import {NavLink} from "react-router-dom";
import {socket} from "./Main";

export default class RulePage extends React.Component {

    componentDidMount() {
        socket.emit("connect to page", {data: "Rules"})
        // socket.on("connect", this.EmitJoinMyRoom)
        // socket.on("disconnect", this.EmitLeaveMyRoom)
    }

    componentWillUnmount() {
        socket.emit("disconnect from page", {data: "Rules"})
        // socket.off("connect")
        // socket.off("disconnect")
    }

    render() {
        return (
            <div className={css.mainer}>
                <NavLink to={"/"}>main</NavLink> &nbsp;|&nbsp;

                <div className={css.title}>Rules</div>
                <div className={css.first_layer}>
                    <div className={css.second_layer}>
                        <div className={css.text_rules_1}>
                            1. The main aim of a game-is to win. You can win by 2 ways: 1-st one is to collect all the
                            flags on your map; 2-nd one is to kill your opponent by two hits.
                        </div>
                        <div className={css.picture_rules_1}/>
                        <div className={css.text_rules_1}>
                            2. When you collect one flag, you board shows you. If you hit your opponent, his life’s are
                            shrinking, and he starts to bleed.
                        </div>
                        <div className={css.picture_rules_1}>
                            {/* <im/> */}
                        </div>
                        <div> 3. If you shoot on you opponent’s flag, flag will be collected by HIM, same rule works in
                            your direction too.
                        </div>
                        <div> 4. If the opponent shot and missed, corners of your map turns red.</div>
                        <div> 5. If the opponent missed the move, his map turns black.</div>
                    </div>
                </div>
            </div>
        )
    }
}