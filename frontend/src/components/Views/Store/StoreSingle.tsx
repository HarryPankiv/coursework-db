import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Table, TableHead, TableCell, TableRow, TableBody } from "@material-ui/core";
import { storeDomain } from "../../../api/domains/Store";

const StoreSingle = (props: RouteComponentProps<{ id: string }>) => {
	const storeId = Number(props.match.params.id);
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
			const result: any = await storeDomain.getStore(storeId);

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Order #{order.id}</h2>
			<p>Order date - {order.orderDate}</p>
			<p>Deadline date - {order.deadlineDate}</p>
			<p>Status - {order.status}</p>
			<p>Orderer name - {order.orderer.name}</p>
			<p>Store name - {order.store.name}</p>
			<p>Store address - {`${order.store.address.address}, ${order.store.address.city}`}</p>
			<h4>Ordered items</h4>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Item Name</TableCell>
						<TableCell>Item Quantity</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{order.orderInvoices.map((el: any) => (
						<TableRow key={el.id}>
							<TableCell>{el.item.id}</TableCell>
							<TableCell>{el.item.name}</TableCell>
							<TableCell>{el.itemQuantity}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default withRouter(StoreSingle);
