import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { deliveryDomain } from "../../../api/domains/Delivery";
import { Table } from "../../Table/Table";

const DeliverySingle = (props: RouteComponentProps<{ id: string }>) => {
	const deliveryId = Number(props.match.params.id);
	const [delivery, setDelivery] = useState<any>({
		id: null,
		deliveryer: {
			name: "",
		},
		deliveryInvoices: [],
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
			const result: any = await deliveryDomain.getOne(deliveryId);

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	const tableRows = delivery.deliveryInvoices.map((deliveryInvoice: any) => ([
		deliveryInvoice.orderInvoice.item.id,
		deliveryInvoice.orderInvoice.item.name,
		deliveryInvoice.orderInvoice.itemQuantity
	]));

	return (
		<div>
			<h2>Delivery #{delivery.id}</h2>
			<p>Delivery date - {delivery.deliveryDate}</p>
			{/* <p>Deadline date - {delivery.deadlineDate}</p>
			<p>Status - {delivery.status}</p>
			<p>Orderer name - {delivery.deliveryer.name}</p>
			<p>Store name - {delivery.store.name}</p>
			<p>
				Store address -&nbsp;
				{delivery.store.address &&
					`${delivery.store.address.address}, ${delivery.store.address.city}`}
			</p> */}
			<h4>Delivered items</h4>
			<Table
				header={['Id', 'Item Name', 'Item Quantity']}
				rows={tableRows}
			/>
		</div>
	);
};

export default withRouter(DeliverySingle);
