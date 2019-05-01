import React, { PureComponent } from 'react'
import OrderForm from './OrderForm';
import { itemDomain } from '../../api/domains/Item';
import { SelectType } from '../../types/genericTypes';
import { orderDomain } from '../../api/domains/Order';

type Prop = {}

type State = Readonly<{
    itemOptions: any
}>

class OrderFormWrapper extends PureComponent<Prop, State> {

    readonly state: State = {
        itemOptions: []
    }

    transformData = (data: any) => data.map( (el: any) => ({ value: el.id, label: el.name}))

    async componentDidMount() {
        const res: any = await itemDomain.getItems()
        const itemOptions: any = res.data;
        console.log(itemOptions)
        itemOptions.item = itemOptions.map( (el: any) => ({ label: el.name, value: el.id }) )
        itemOptions.type = this.transformData(itemOptions.type)
        itemOptions.color = this.transformData(itemOptions.color)
        itemOptions.size = this.transformData(itemOptions.size)
        itemOptions.gender = this.transformData(itemOptions.gender)

        this.setState({itemOptions})
    }

    handleSubmit = async (data: any) => {
        await orderDomain.createOrder(data)
    }

    render() {
        const { itemOptions } = this.state;

        return (
            <OrderForm
                itemOptions={itemOptions}
                onSubmit={this.handleSubmit}
            />
        )
    }

}

export default OrderFormWrapper