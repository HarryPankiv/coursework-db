import React, { useEffect, useState } from "react";
import { itemDomain } from "../../api/domains/Item";
import { Select } from "antd";

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

	const handleChange = (value: string) => {
		console.log(value)
	}

	return (
		<div>
			<Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
				<Select.Option value="jack">Jack</Select.Option>
				<Select.Option value="lucy">Lucy</Select.Option>
				<Select.Option value="disabled" disabled>Disabled</Select.Option>
				<Select.Option value="Yiminghe">yiminghe</Select.Option>
			</Select>
		</div>
	);
};

export default Items;
