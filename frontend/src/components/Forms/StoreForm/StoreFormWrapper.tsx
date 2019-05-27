import React, { PureComponent } from 'react'
import StoreForm from './StoreForm';
import { storeDomain } from '../../../api/domains/Store';

type Prop = {}

type State = Readonly<{

}>

class StoreFormWrapper extends PureComponent<Prop, State> {

    readonly state: State = {

    }

    handleSubmit = async (data: any) => {
        await storeDomain.create(data)
    }

    render() {
        return (
            <StoreForm
                onSubmit={this.handleSubmit}
            />
        )
    }

}

export default StoreFormWrapper