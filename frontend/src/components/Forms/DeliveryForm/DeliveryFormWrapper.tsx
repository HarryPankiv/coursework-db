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

	async componentDidMount() {
		const orderResponse: any = await orderDomain.getAll();
		const orderData = orderResponse.data;

		const orderOptions: any = orderData.map((el: any) => ({
			label: el.id,
			value: el.id,
			invoices: el.orderInvoices,
        }));

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
