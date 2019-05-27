import React, { PureComponent } from "react";
import DeliveryForm from "./DeliveryForm";
import { itemDomain } from "../../../api/domains/Item";
import { SelectType } from "../../../types/genericTypes";
import { orderDomain } from "../../../api/domains/Order";
import { warehouseDomain } from "../../../api/domains/Warehouse";
import dayjs from "dayjs";
import { deliveryDomain } from "../../../api/domains/Delivery";

type Prop = {};

type State = Readonly<{
	itemOptions: any;
	warehouseOptions: any;
	orderOptions: any;
}>;

class DeliveryFormWrapper extends PureComponent<Prop, State> {
	readonly state: State = {
		itemOptions: [],
		warehouseOptions: [],
		orderOptions: [],
	};

	transformData = (data: any) => data.map((el: any) => ({ value: el.id, label: el.name }));

	async componentDidMount() {
		const orderResponse: any = await orderDomain.getAll();
		const orderData = orderResponse.data.filter( (el: any) => el.status !== 'in delivery' );

		const orderOptions: any = orderData.map((el: any) => ({
			label: el.id,
			value: el.id,
			invoices: el.orderInvoices,
        }));
        
        // const itemOptions: any = itemData.map((el: any) => ({
		// 	value: el.id,
		// 	label: el.name,
		// 	color: el.color.map((color: any) => ({ label: color.name, value: color.id })),
		// 	size: el.size.map((size: any) => ({ label: size.name, value: size.id })),
		// 	type: {
		// 		label: el.type.name,
		// 		value: el.type.id,
		// 	},
		// 	gender: {
		// 		label: el.gender.name,
		// 		value: el.gender.id,
		// 	},
		// }));

		this.setState({ orderOptions });
	}

	handleSubmit = async (delivery: any) => {
        await deliveryDomain.create(delivery)
	};

	render() {
		const { orderOptions } = this.state;

		return (
			<DeliveryForm
				orderOptions={orderOptions}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

export default DeliveryFormWrapper;
