import * as React from "react"
import {Admin, Resource} from 'react-admin'
import UserIcon from '@material-ui/icons/Group'

import Dashboard from './Dashboard'
import {UserList} from './users'

import authProvider from './authProvider'
import createRealtimeSaga from "./createRealtimeSaga"
import dataProvider from "./dataProvider"

const realTimeSaga = createRealtimeSaga(dataProvider)

const Main = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider}
           dataProvider={dataProvider} customSagas={[realTimeSaga]}>
        <Resource name="users" list={UserList} icon={UserIcon}/>
    </Admin>
)

export default Main
