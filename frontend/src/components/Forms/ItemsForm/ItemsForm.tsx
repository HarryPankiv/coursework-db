import React from "react";
import Select from 'react-select';
import { SelectType } from "../../../types/genericTypes";

type Prop = {
	itemOptions: any,
	onSubmit: (data: any) => void
}

type State = Readonly<{
	ordererName: string,
	items: Array<{itemId: string, quantity: number}>
}>

export default class ItemsForm extends React.Component<Prop, State> {
	readonly state: State = {
		ordererName: "",
		items: [],
	};

	handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [name]: e.target.value } as any);
	};

	transformValue = ( fieldType: string, fieldValue: any) => {
		switch(fieldType) {
			case 'text':
				return fieldValue.target.value;
			case 'select':
				return fieldValue ? fieldValue.value : '';
			default:
				return null;
		}
	}

	handleItemChange = (fieldType: string, fieldName: string, idx: number) => (fieldValue: any) => {
		const { items } = this.state
		
		const newItems = items.map((item, sidx) => {
			if (idx !== sidx) return item;

			return { ...item, [fieldName]: this.transformValue(fieldType, fieldValue) };
		});

		this.setState({ items: newItems }, () => console.log(this.state));
	};

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { ordererName, items } = this.state;

		this.props.onSubmit({ordererName, items})
	};

	handleAddItem = () => {
		this.setState({
			items: this.state.items.concat([{ itemId: "", quantity: 0 }]),
		});
	};

	handleRemoveItem = (idx: number) => () => {
		this.setState({
			items: this.state.items.filter((s, sidx) => idx !== sidx),
		});
	};

	render() {
		const { ordererName, items } = this.state;
		const { itemOptions } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Orderer name"
					value={ordererName}
					onChange={this.handleChange('ordererName')}
				/>

				<h4>Items</h4>

				{items.map((item, idx) => (
					<div className="item" key={idx}>
						<Select
							options={itemOptions[idx].item}
							onChange={this.handleItemChange('select', 'itemId', idx)}
						/>
						<Select
							options={itemOptions[idx].type}
							onChange={this.handleItemChange('select', 'typeId', idx)}
						/>
						<Select
							options={itemOptions[idx].gender}
							onChange={this.handleItemChange('select', 'genderId', idx)}
						/>
						<Select
							options={itemOptions[idx].color}
							onChange={this.handleItemChange('select', 'colorId', idx)}
						/>
						<Select
							options={itemOptions[idx].size}
							onChange={this.handleItemChange('select', 'sizeId', idx)}
						/>
						<input
							type="text"
							placeholder={`Item #${idx + 1} quantity`}
							value={item.quantity}
							onChange={this.handleItemChange('text', 'quantity', idx)}
						/>
						<button type="button" onClick={this.handleRemoveItem(idx)} className="small">
							-
						</button>
					</div>
				))}
				<button type="button" onClick={this.handleAddItem} className="small">
					Add Item
				</button>
				<button type="submit">Order</button>
			</form>
		);
	}
}
