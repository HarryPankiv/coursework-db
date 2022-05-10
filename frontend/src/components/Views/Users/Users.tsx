import React, { useEffect, useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Table } from "../../Table/Table";
import { userDomain } from "../../../api/domains/User";
import { Button } from "../../../styles/styled";
import { Roles } from "../../../types/roles";
import { FiX as Cross } from 'react-icons/fi'

const Users = (props: RouteComponentProps) => {
	const [users, setUsers] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await userDomain.getAll();

			setUsers(result.data);
		};

		fetchData();
	}, []);

	const handleDelete = (id: number) => (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		userDomain.delete(id)
	}

	const tableRows = users.map((user: any) => [
		user.id,
		user.name,
		user.email,
		user.phoneNumber,
		user.birthday,
		user.salary,
		user.position.name,
		// @ts-ignore
		user.position.name !== Roles.admin && <Cross onClick={handleDelete(user.id)}/>
	]);

	return (
		<div>
			<h2>Users</h2>
			<Link to={`${url}/new`}>
				<Button>new user</Button>
			</Link>
			<Table
				header={["Id", "Name", "Email", "Phone", "Birthday", "Salary", "Position", "remove"]}
				rows={tableRows}
			/>
		</div>
	);
};

export default withRouter(Users);
