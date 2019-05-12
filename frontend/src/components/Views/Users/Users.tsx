import React, { useEffect, useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableCell, TableHead, TableBody, Table, TableRow } from "@material-ui/core";
import { userDomain } from "../../../api/domains/User";

const Users = () => {
	const [items, setUsers] = useState<any>([]);
	useEffect(() => {
		const fetchData = async () => {
			const result: any = await userDomain.getUsers();

			setUsers(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Users</h2>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell>Birthday</TableCell>
						<TableCell>Salary</TableCell>
						<TableCell>Position</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{items.map((el: any) => (
						<TableRow key={el.id}>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.name}</TableCell>
							<TableCell>{el.email}</TableCell>
							<TableCell>{el.phoneNumber}</TableCell>
							<TableCell>{el.birthday}</TableCell>
							<TableCell>{el.salary}</TableCell>
							<TableCell>{el.position.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default Users;
