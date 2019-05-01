import React, { useEffect, useState } from "react";
import { itemDomain } from "../../api/domains/Item";
import Select from "react-select";

const Items = () => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result:any = await itemDomain.getItems();

			setItems(result);
		};

		fetchData();
	}, []);

	console.log(items)

	const handleChange = (value: any) => {
		console.log(value)
	}

	return (
		<div>
			<Select onChange={handleChange}></Select>
		</div>
	);
};

export default Items;
