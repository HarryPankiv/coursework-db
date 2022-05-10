import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { storeDomain } from "../../../api/domains/Store";
import { Button } from "../../../styles/styled";
import { Table } from "../../Table/Table";
import { FiX as Cross } from 'react-icons/fi'

const Store = (props: RouteComponentProps) => {
	const [stores, setStores] = useState<any>([]);
	const { url } = props.match;

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await storeDomain.getAll();

			setStores(result.data);
		};

		fetchData();
	}, []);

	const handleDelete = (id: number) => (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		storeDomain.delete(id)
		setStores(stores.filter((x: any) => x.id !== id))
	}

	const tableRows = stores.map((store: any) => [
		store.id,
		store.name,
		store.email,
		store.phoneNumber,
		store.address && `${store.address.address}, ${store.address.city}`,
		// @ts-ignore
		<Cross onClick={handleDelete(store.id)}/>
	]);

	return (
		<div>
			<h2>Store</h2>
			<Link to={`${url}/new`}>
				<Button>new store</Button>
			</Link>
			<Table header={["Id", "Name", "Email", "Phone Number", "Address", "Remove"]} rows={tableRows} />
		</div>
	);
};

export default withRouter(Store);
