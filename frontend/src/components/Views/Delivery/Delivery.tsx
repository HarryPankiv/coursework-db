import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { deliveryDomain } from "../../../api/domains/Delivery";
import { Button } from "../../../styles/styled";
import { Table } from "../../Table/Table";
import { transformAddress } from "../../../helpers/transformAddress";
import { FiX as Cross } from 'react-icons/fi'

const Delivery = (props: RouteComponentProps) => {
	const [deliveries, setDelivery] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await deliveryDomain.getAll();

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	const handleDelete = (id: number) => (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		setDelivery(deliveries.filter( (delivery: any) => delivery.id !== id))
		deliveryDomain.delete(id);
	}

	const tableRows = deliveries.map((delivery: any) => [
		delivery.id,
		delivery.deliveryDate,
		delivery.store.name,
		transformAddress(delivery.store.address),
		delivery.warehouse.name,
		transformAddress(delivery.warehouse.address),
		<Cross onClick={handleDelete(delivery.id)}/>
	]);

	return (
		<div>
			<h2>Delivery</h2>
			<Link to={`${url}/new`}>
				<Button>new delivery</Button>
			</Link>
			<Table
				header={[
					"Id",
					"Delivery Date",
					"Warehouse name",
					"Warehouse address",
					"Store name",
					"Store address",
					'Remove'
				]}
				rows={tableRows}
			/>
		</div>
	);
};

export default withRouter(Delivery);
