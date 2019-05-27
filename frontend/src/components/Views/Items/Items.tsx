import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FiX as Cross } from 'react-icons/fi'
import { itemDomain } from "../../../api/domains/Item";
import { Button } from "../../../styles/styled";
import { Table } from "../../Table/Table";

const Items: any = (props: any): any => {
	const [items, setItems] = useState<any>([]);
	const { url } = props.match;

	const fetchItems = () => {
		const fetchData = async () => {
			const result: any = await itemDomain.getAll();

			setItems(result.data);
		};

		fetchData();
	}

	useEffect(fetchItems, []);

	const handleDelete = (id: number) => (e: any) => {
		e.stopPropagation()
		e.preventDefault()
		setItems(items.filter( (item: any) => item.id !== id))
		itemDomain.delete(id)
	}

	const tableRows = items.map((item: any) => [
		item.id,
		item.name,
		item.gender.name,
		item.type.name,
		item.size.map( (el: any) => el.name ).join(', '),
		item.color.map( (el: any) => el.name ).join(', '),
		<Cross onClick={handleDelete(item.id)}/>
	]);

	return (
		<div>
			<h2>Items</h2>
			<Link to={`${url}/new`}>
				<Button>new item</Button>
			</Link>
			<Table
				header={['Id', 'name', 'gender', 'type', 'sizes', 'colors', 'remove']}
				rows={tableRows}
			/>
		</div>
	);
};

export default withRouter(Items);
