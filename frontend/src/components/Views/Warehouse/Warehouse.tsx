import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { warehouseDomain } from "../../../api/domains/Warehouse";
import { Button } from "../../../styles/styled";
import { Table } from "../../Table/Table";
import { FiX as Cross } from 'react-icons/fi'

const Warehouse = (props: RouteComponentProps) => {
	const [warehouses, setWarehouses] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await warehouseDomain.getAll();

			setWarehouses(result.data);
		};

		fetchData();
	}, []);

	const handleDelete = (id: number) => (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		warehouseDomain.delete(id)
	}

	const tableRows = warehouses.map((warehouse: any) => [
		warehouse.id,
		warehouse.name,
		warehouse.email,
		warehouse.phoneNumber,
		warehouse.width,
		warehouse.length,
		<Cross onClick={handleDelete(warehouse.id)}/>
	]);

	return (
		<div>
			<h2>Warehouse</h2>
			<Link to={`${url}/new`}>
				<Button>new warehouse</Button>
			</Link>
			<Table header={["Id", "Name", "Email", "Phone Number", "Width", "Length", "remove"]} rows={tableRows} />
		</div>
	);
};

export default withRouter(Warehouse);
