import React, { useState } from "react";
import dayjs from "dayjs";
import { ButtonSwitch } from "../../ButtonSwitch/ButtonSwitch";
import { Table } from "../../Table/Table";
import { Select, Button, Form, DatePicker } from "../../../styles/styled";
import { withRouter, RouteComponentProps } from "react-router";
import queryString from 'query-string';

type Prop = {
	orderOptions: any;
	onSubmit: (data: any) => void;
};

type State = Readonly<{
	items: number[];
	deliveryDate: Date;
	selectedOrder: any;
	order: number | null;
	totalQuantity: number;
}>;

class DeliveryForm extends React.Component<Prop & RouteComponentProps, State> {
	readonly state: State = {
		items: [],
		deliveryDate: dayjs().add(5, 'day').toDate(),
		order: null,
		selectedOrder: null,
		totalQuantity: 0,
	};

	handleChange = (fieldType: string, fieldName: string) => (filterValue: any) => {
		this.setState({ [fieldName]: this.transformValue(fieldType, filterValue) } as any);
	};

	transformValue = (fieldType: string, fieldValue: any) => {
		switch (fieldType) {
			case "text":
				return fieldValue.target.value;
			case "select":
				return fieldValue ? fieldValue.value : "";
			case "multi-select":
				return fieldValue && fieldValue.map((el: any) => ({ id: el.value }));
			case "date":
				return fieldValue;
			default:
				return null;
		}
	};

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		this.props.onSubmit(this.state);

		this.props.history.push('/delivery')
	};

	handleSwitcherClick = (id: number) => {
		const { items } = this.state
		let deliveryItems;

		if (items.includes(id)) {
			deliveryItems = items.filter(el => el !== id)
		} else {
			deliveryItems = [...items, id]
		}

		this.setState({ items: deliveryItems });
	};

	componentDidUpdate(prevProps: any) {
		if (prevProps !== this.props) {
			const { orderOptions, location } = this.props;
			const defaultOrderId = Number(queryString.parse(location.search).id) || null;
			const defaultOrder = orderOptions.find((el: any) => el.value === defaultOrderId)
			this.setState({ selectedOrder: defaultOrder, order: defaultOrderId })
		}
	}

	render() {
		const { order: orderId, deliveryDate, selectedOrder } = this.state;
		const { orderOptions, location } = this.props;

		return (
			<Form onSubmit={this.handleSubmit} style={{ maxWidth: "500px" }}>
				<h2>Delivery</h2>
				<div>
					<h4>Order id</h4>
					<Select
						options={orderOptions}
						onChange={this.handleChange("select", "order")}
						value={selectedOrder} />
				</div>

				{orderId && (
					<>
						<div>
							<h4>Items</h4>
							<Table
								header={["item id", "item name", "item quantity", "to deliver"]}
								rows={orderOptions
									.find((order: any) => order.value === orderId)
									.invoices.map((invoice: any, i: any) => [
										invoice.item.id,
										invoice.item.name,
										invoice.itemQuantity,
										<ButtonSwitch
											id={invoice.item.id}
											onClick={this.handleSwitcherClick}
										>
											yes
										</ButtonSwitch>,
									])}
								hover={false}
							/>
						</div>
						<div>
							<h4>Delivery date</h4>
							<DatePicker
								className="date-picker"
								selected={deliveryDate}
								minDate={dayjs().add(5, 'day').toDate()}
								onChange={this.handleChange("date", "deliveryDate")}
							/>
						</div>
					</>
				)}
				<Button type="submit">Deliver</Button>
			</Form>
		);
	}
}

export default withRouter(DeliveryForm)