import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { warehouseDomain } from "../../../api/domains/Warehouse";
import { Table, StyledTable } from "../../Table/Table";
import { orderDomain } from "../../../api/domains/Order";
import { Button, Select, Input } from "../../../styles/styled";
import { transformAddress } from "../../../helpers/transformAddress";
import { Link } from "react-router-dom";
import { itemDomain } from "../../../api/domains/Item";

const StoreSingle = (props: RouteComponentProps<{ id: string }>) => {
	const { match } = props
	const warehouseId: number = Number(match.params.id);
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
			<Table header={["Id", "Item Name", "Item Quantity"]} rows={itemRows} hover={false} />
			<AddItem warehouseId={warehouse.id} />
			<h4>Orders</h4>
			<StyledTable>
				<thead>
					<tr>
						<th>Id</th>
						<th>Order Date</th>
						<th>Deadline Date</th>
						<th>Status</th>
						<th>Items</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order: any) => (
						<ListItem order={order} />
					))}
				</tbody>
			</StyledTable>
			<Button>
				<Link to={`${match.url}/update`}>update warehouse info</Link>
			</Button>
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
				<td>{order.status}</td>
				<td>
					<Button style={{ display: "flex" }} onClick={() => setExpanded(!expanded)}>
						{" "}
						show Items
					</Button>
				</td>
			</tr>
			{expanded && (
				<tr>
					<td></td>
					<td></td>
					<td colSpan={3} style={{padding: 0}}>
						<Table header={["item id", "item quantity", "item name"]} rows={rows} hover={false}/>
						{ order.status==='not started' &&
							<Link to={`/delivery/new?id=${order.id}`}>
								<Button>
									go to delivery
								</Button>
							</Link>
						}
					</td>
				</tr>
			)}
		</>
	);
};

export default withRouter(StoreSingle);


const AddItem = (props: any) => {
	const [ itemOptions, setItemOptions ] =  useState([]);
	const [ item, setItemName ] =  useState<{value: number, label: string}>({value: 0, label: ''});
	const [ itemQuantity, setItemQuantity ] =  useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const itemResponse: any = await itemDomain.getAll();
			const itemData: any = itemResponse.data;

			setItemOptions(itemData.map((el: any) => ({
				value: el.id,
				label: el.name,
			})));
		};

		fetchData();
	}, []);

	const handleClick = () => {
		warehouseDomain.populate(props.warehouseId, { itemId: item.value, itemQuantity})
	}

	return (
		<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
			<div>
				<h4>Add Item</h4>
				<Select 
					options={itemOptions}
					onChange={ (fieldValue: any) => setItemName(fieldValue)}
				/>
			</div>
			<div>
				<h4>Quantity</h4>
				<Input onChange={ (e: any) => setItemQuantity(Number(e.target.value))} />
			</div>
			<Button onClick={handleClick} disabled={Number.isNaN(itemQuantity)}>Add item</Button>
		</div>
	)
}