import React, { PureComponent } from "react";
import OrderForm from "./OrderForm";
import { itemDomain } from "../../../api/domains/Item";
import { SelectType } from "../../../types/genericTypes";
import { orderDomain } from "../../../api/domains/Order";
import { warehouseDomain } from "../../../api/domains/Warehouse";
import { storeDomain } from "../../../api/domains/Store";
import dayjs from "dayjs";

type Prop = {};

type State = Readonly<{
	itemOptions: any;
	warehouseOptions: any;
	store: any;
}>;

class OrderFormWrapper extends PureComponent<Prop, State> {
	readonly state: State = {
		itemOptions: [],
		warehouseOptions: [],
		store: {},
	};

	transformData = (data: any) => data.map((el: any) => ({ value: el.id, label: el.name }));

	async componentDidMount() {
		const itemResponse: any = await itemDomain.getAll();
		const itemData: any = itemResponse.data;

		const itemOptions: any = itemData.map((el: any) => ({
			value: el.id,
			label: el.name,
			color: el.color.map((color: any) => ({ label: color.name, value: color.id })),
			size: el.size.map((size: any) => ({ label: size.name, value: size.id })),
			type: {
				label: el.type.name,
				value: el.type.id,
			},
			gender: {
				label: el.gender.name,
				value: el.gender.id,
			},
		}));

		const user: any = JSON.parse(localStorage.getItem("user") as string);
		const storeResponse: any = await storeDomain.getOne(user.id);
		const store = storeResponse.data;

		const warehouseResponse: any = await warehouseDomain.getAll();
		const warehouseData = warehouseResponse.data;

		const warehouseOptions: any = warehouseData.map((el: any) => ({
			label: el.name,
			value: el.id,
		}));

		this.setState({ itemOptions, warehouseOptions, store });
	}

	handleSubmit = async (data: any) => {
		const user: any = JSON.parse(localStorage.getItem("user") as string);
		const order = { ...data };
		order.orderDate = dayjs().toDate();

		order.orderer = user.id;
		order.store = user.store.id;
		order.status = "not started";

		order.orderInvoices = data.items.map((el: any) => ({
			item: el.itemId,
			itemQuantity: Number(el.quantity),
		}));
		delete order.items;

		await orderDomain.create(order);
	};

	render() {
		const { itemOptions, warehouseOptions, store } = this.state;

		return (
			<OrderForm
				itemOptions={itemOptions}
				warehouseOptions={warehouseOptions}
				store={store}
				onSubmit={this.handleSubmit}
			/>
		);
	}
}

export default OrderFormWrapper;
