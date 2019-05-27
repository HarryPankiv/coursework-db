import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { orderDomain } from "../../../api/domains/Order";
import { Button } from "../../../styles/styled";
import { Table } from "../../Table/Table";
import { FiX as Cross } from 'react-icons/fi'

const Order = (props: RouteComponentProps) => {
	const [orders, setDelivery] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await orderDomain.getAll();

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	const handleDelete = (id: number) => (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		orderDomain.delete(id)
	}

	const tableRows = orders.map((order: any) => [
		order.id,
		order.orderer.name,
		order.store &&
			order.store.address &&
			`${order.store.address.address}, ${order.store.address.city}`,
		order.status,
		order.orderDate,
		order.deadlineDate,
		order.totalQuantity,
		<Link to={`${url}/${order.id}`}>More Info</Link>,
		<Cross onClick={handleDelete(order.id)}/>
	]);

	return (
		<div>
			<h2>Order</h2>
			<Link to={`${url}/new`}>
				<Button>new order</Button>
			</Link>

			<Table
				header={[
					"Id",
					"Orderer Name",
					"Delivery Address",
					"Status",
					"Order Date",
					"Deadline Date",
					"Total Quantity",
					"Items",
					"Remove"
				]}
				rows={tableRows}
			/>
		</div>
	);
};

export default withRouter(Order);
