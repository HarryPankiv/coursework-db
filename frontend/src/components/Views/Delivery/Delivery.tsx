import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableCell, TableHead, TableBody, Table, TableRow } from "@material-ui/core";
import { deliveryDomain } from "../../../api/domains/Delivery";

const Delivery = (props: RouteComponentProps) => {
	const [deliveries, setDelivery] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await deliveryDomain.getDeliveries();

			setDelivery(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Delivery</h2>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Delivery Date</TableCell>
						<TableCell>Items</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{deliveries.map((el: any) => (
						<TableRow key={el.id}>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.status}</TableCell>
							<TableCell>{el.deliveryDate}</TableCell>
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

export default withRouter(Delivery);
