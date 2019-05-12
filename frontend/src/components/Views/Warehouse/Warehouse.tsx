import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableCell, TableHead, TableBody, Table, TableRow } from "@material-ui/core";
import { warehouseDomain } from "../../../api/domains/Warehouse";

const Warehouse = (props: RouteComponentProps) => {
	const [warehouses, setUsers] = useState<any>([]);
	useEffect(() => {
		const fetchData = async () => {
			const result: any = await warehouseDomain.getUsers();

			setUsers(result.data);
		};

		fetchData();
	}, []);
	const { url } = props.match;

	return (
		<div>
			<h2>Warehouse</h2>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell>Width</TableCell>
						<TableCell>Length</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{warehouses.map((el: any) => (
						<TableRow key={el.id}>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.email}</TableCell>
							<TableCell>{el.phoneNumber}</TableCell>
							<TableCell>{el.width}</TableCell>
							<TableCell>{el.length}</TableCell>
							<TableCell>
								<Link to={`${url}/${el.id}`}>Items</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default withRouter(Warehouse);
