import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableHead, TableCell, TableRow, Table, TableBody } from "@material-ui/core";
import { orderDomain } from "../../../api/domains/Order";

const Order = (props: RouteComponentProps) => {
	const [orders, setDelivery] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await orderDomain.getOrders();

			setDelivery(result.data);
		};

		fetchData();
	}, []);
		
	return (
		<div>
			<h2>Order</h2>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Orderer Name</TableCell>
						<TableCell>Delivery Address</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Order Date</TableCell>
						<TableCell>Deadline Date</TableCell>
						<TableCell>Total Quantity</TableCell>
						<TableCell>Items</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{orders.map( (el: any) => (
						<TableRow key={el.id}>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.orderer.name}</TableCell>
							<TableCell>{`${el.store.address.address}, ${el.store.address.city}`}</TableCell>
							<TableCell>{el.status}</TableCell>
							<TableCell>{el.orderDate}</TableCell>
							<TableCell>{el.deadlineDate}</TableCell>
							<TableCell>{el.totalQuantity}</TableCell>
							<TableCell>
								<Link to={`${url}/${el.id}`}>
									Items
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default withRouter(Order)
