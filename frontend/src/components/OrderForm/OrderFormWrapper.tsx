import React, { PureComponent } from 'react'
import OrderForm from './OrderForm';
import { itemDomain } from '../../api/domains/Item';
import { SelectType } from '../../types/genericTypes';
import { orderDomain } from '../../api/domains/Order';

type Prop = {}

type State = Readonly<{
    selectOptions: SelectType
}>

class OrderFormWrapper extends PureComponent<Prop, State> {

    readonly state: State = {
        selectOptions: []
    }

    async componentDidMount() {
        const res = await itemDomain.getItems()
        console.log(res)

        const selectOptions = res.data.map( el => ({
            value: el.id.toString(),
            label: el.name
        }))
        this.setState({selectOptions})
    }

    handleSubmit = async (data: any) => {
        await orderDomain.createOrder(data)
    }

    render() {
        const { selectOptions } = this.state;

        return (
            <OrderForm
                selectOptions={selectOptions}
                onSubmit={this.handleSubmit}
            />
        )
    }

}

export default OrderFormWrapper