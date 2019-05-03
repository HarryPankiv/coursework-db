import React, { useEffect, useState } from "react";
import { itemDomain } from "../../api/domains/Item";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

const Items: any = (props: any): any => {
	const [items, setItems] = useState<any>([]);
	useEffect(() => {
		const fetchData = async () => {
			const result:any = await itemDomain.getItems();

			setItems(result.data);
		};

		fetchData();
	}, []);

	console.log(items)

	const handleChange = (value: any) => {
		console.log(value)
	}

	const { url } = props.match;

	return (
		<div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>ordererName</TableCell>
						<TableCell>deliveryAddress</TableCell>
						<TableCell>status</TableCell>
						<TableCell>orderDate</TableCell>
						<TableCell>deadlineDate</TableCell>
						<TableCell>totalQuantity</TableCell>
						<TableCell>Items</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{items.map( (el: any) => (
						<TableRow>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.ordererName}</TableCell>
							<TableCell>{el.deliveryAddress}</TableCell>
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
	);
};

export default withRouter(Items);
