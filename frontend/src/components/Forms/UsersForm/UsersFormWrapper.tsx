import React, { PureComponent } from 'react'
import UsersForm from './UsersForm';
import { userDomain } from '../../../api/domains/User';

type Prop = {}

type State = Readonly<{
    itemOptions: any
}>

class UsersFormWrapper extends PureComponent<Prop, State> {

    readonly state: State = {
        itemOptions: []
    }

    handleSubmit = async (data: any) => {
        await userDomain.create(data)
    }

    render() {
        return (
            <UsersForm
                onSubmit={this.handleSubmit}
            />
        )
    }

}

export default UsersFormWrapper