import * as React from "react"
import {List, Datagrid, TextField, EmailField, UrlField, TextInput, ReferenceInput, SelectInput} from 'react-admin'

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="url"/>
            {/*<EmailField source="email" />*/}
            {/*<TextField source="phone" />*/}
            {/*<UrlField source="website" />*/}
            {/*<TextField source="company.name" />*/}
        </Datagrid>
    </List>
)