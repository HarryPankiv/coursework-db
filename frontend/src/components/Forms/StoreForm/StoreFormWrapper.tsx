import React, { PureComponent } from 'react'
import StoreForm from './StoreForm';
import { storeDomain } from '../../../api/domains/Store';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type Prop = {}

type State = Readonly<{
}>

class StoreFormWrapper extends PureComponent<RouteComponentProps & Prop, State> {

    readonly state: State = {
    }

    handleSubmit = async (data: any) => {
        const address = { address: data.address, city: data.city }
        delete data.address
        delete data.city
        data.address = address

        await storeDomain.create(data)

		this.props.history.push('/store');
    }

    render() {
        return (
            <StoreForm
                onSubmit={this.handleSubmit}
            />
        )
    }

}

export default withRouter(StoreFormWrapper);