import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { orderDomain } from "../../../api/domains/Order";
import { Table } from "../../Table/Table";

const OrderSingle = (props: RouteComponentProps<{ id: string }>) => {
	const orderId = Number(props.match.params.id);
	const [order, setDelivery] = useState<any>({
		id: null,
		orderer: {
			name: "",
		},
		orderInvoices: [],
		store: {
			name: "",
			address: {
				address: "",
				city: "",
			},
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await orderDomain.getOne(orderId);

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	const tableRows = order.orderInvoices.map((orderInvoice: any) => ([
		orderInvoice.item.id,
		orderInvoice.item.name,
		orderInvoice.itemQuantity
	]));

	return (
		<div>
			<h2>Order #{order.id}</h2>
			<p>Order date - {order.orderDate}</p>
			<p>Deadline date - {order.deadlineDate}</p>
			<p>Status - {order.status}</p>
			<p>Orderer name - {order.orderer.name}</p>
			<p>Store name - {order.store.name}</p>
			<p>
				Store address -&nbsp;
				{order.store.address &&
					`${order.store.address.address}, ${order.store.address.city}`}
			</p>
			<h4>Ordered items</h4>
			<Table
				header={['Id', 'Item Name', 'Item Quantity']}
				rows={tableRows}
			/>
		</div>
	);
};

export default withRouter(OrderSingle);
