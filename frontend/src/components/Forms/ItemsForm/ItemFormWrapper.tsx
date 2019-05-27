import React, { PureComponent } from "react";
import ItemForm from "./ItemForm";
import { itemDomain } from "../../../api/domains/Item";
import { SelectType } from "../../../types/genericTypes";

type Prop = {};

type State = Readonly<{
	itemOptions: any;
}>;

class ItemFormWrapper extends PureComponent<Prop, State> {
	readonly state: State = {
		itemOptions: [],
	};

	transformData = (data: any) => data.map((el: any) => ({ value: el.id, label: el.name }));

	async componentDidMount() {
		const itemResponse: any = await itemDomain.getOptions();
		const itemOptions: any = itemResponse.data;

		this.setState({ itemOptions });
	}

	handleSubmit = async (data: any) => await itemDomain.create(data);

	render() {
		const { itemOptions } = this.state;

		return <ItemForm itemOptions={itemOptions} onSubmit={this.handleSubmit} />;
	}
}

export default ItemFormWrapper;
