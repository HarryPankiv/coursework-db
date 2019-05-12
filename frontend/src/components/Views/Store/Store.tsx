import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableCell, TableHead, TableBody, Table, TableRow } from "@material-ui/core";
import { storeDomain } from "../../../api/domains/Store";

const Store = (props: RouteComponentProps) => {
	const [stores, setDelivery] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await storeDomain.getStores();

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	const redirectToStore = (id: any) => () => props.history.push(`${url}/${id}`)

	return (
		<div>
			<h2>Store</h2>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell>Address</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{stores.map((el: any) => (
						<TableRow key={el.id} onClick={redirectToStore(el.id)}>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell>{el.email}</TableCell>
							<TableCell>{el.phoneNumber}</TableCell>
							<TableCell>{`${el.address.address}, ${el.address.city}`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default withRouter(Store);
