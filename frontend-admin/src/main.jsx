import * as React from "react"
import {Admin, Resource} from 'react-admin'
import Dashboard from './Dashboard'
import authProvider from './authProvider'
import {UserList} from './users'
import UserIcon from '@material-ui/icons/Group'
import dataProvider from "./dataProvider"

const Main = () => (
    <div>
        <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="users" list={UserList} icon={UserIcon}/>
        </Admin>
    </div>


)

export default Main
