import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { warehouseDomain } from "../../../api/domains/Warehouse";
import { Table, StyledTable } from "../../Table/Table";
import { orderDomain } from "../../../api/domains/Order";
import { Button } from "../../../styles/styled";
import styled from "styled-components";
import { transformAddress } from "../../../helpers/transformAddress";

const StoreSingle = (props: RouteComponentProps<{ id: string }>) => {
	const warehouseId: number = Number(props.match.params.id);
	const [orders, setOrders] = useState<any>([]);
	const [warehouse, setWarehouse] = useState<any>({
		id: null,
		itemWarehouses: [],
		address: {
			address: "",
			city: "",
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			const warehouseResponse: any = await warehouseDomain.getOne(warehouseId);
			const orderResponse: any = await orderDomain.getAllByWarehouseId(warehouseId);

			setWarehouse(warehouseResponse.data);
			setOrders(orderResponse.data);
		};

		fetchData();
	}, []);

	const itemRows = warehouse.itemWarehouses.map((itemWarehouse: any) => [
		itemWarehouse.item.id,
		itemWarehouse.item.name,
		itemWarehouse.itemQuantity,
	]);

	return (
		<div>
			<h2>Warehouse #{warehouse.id}</h2>
			<p>name - {warehouse.name}</p>
			<h4>Warehouse size</h4>
			<p>width - {warehouse.width}</p>
			<p>length - {warehouse.length}</p>
			<p>warehouse address - {transformAddress(warehouse.address)}</p>
			<h4>Warehouse Items</h4>
			<Table header={["Id", "Item Name", "Item Quantity"]} rows={itemRows} />
			<Button>Add item</Button>
			<h4>Orders</h4>
			<StyledTable>
				<thead>
					<tr>
						<th>Id</th>
						<th>Order Date</th>
						<th>Deadline Date</th>
						<th>Items</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order: any) => (
						<ListItem order={order} />
					))}
				</tbody>
			</StyledTable>
			<Button>update warehouse info</Button>
		</div>
	);
};

const ListItem = ({ order }: any) => {
	const [expanded, setExpanded] = useState();

	const rows = order.orderInvoices.map((invoice: any) => [
		invoice.item.id,
		invoice.itemQuantity,
		invoice.item.name,
	]);

	return (
		<>
			<tr>
				<td>{order.id}</td>
				<td>{order.orderDate}</td>
				<td>{order.deadlineDate}</td>
				<td>
					<Button style={{ display: "flex" }} onClick={() => setExpanded(!expanded)}>
						{" "}
						show Items
					</Button>
				</td>
			</tr>
			{expanded && (
				<tr>
					<td colSpan={4}>
						<h4>Items</h4>
						<Table header={["item id", "item quantity", "item name"]} rows={rows} />
						<Button>go to delivery</Button>
					</td>
				</tr>
			)}
		</>
	);
};

export default withRouter(StoreSingle);
