import React from "react";
import { Select, Input } from 'antd';
import { SelectType } from "../../types/genericTypes";

type Prop = {
	selectOptions: SelectType,
	onSubmit: (data: any) => void
}

type State = Readonly<{ordererName: string, items: Array<{name: string, quantity: number}>}>

export default class OrderForm extends React.Component<Prop, State> {
	readonly state: State = {
		ordererName: "",
		items: [{ name: "", quantity: 0 }],
	};

	handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [name]: e.target.value } as any);
	};

	handleItemChange = (idx: number, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const { items } = this.state
		
		const newItems = items.map((item, sidx) => {
			if (idx !== sidx) return item;

			return { ...item, [field]: e.target.value };
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
			items: this.state.items.concat([{ name: "", quantity: 0 }]),
		});
	};

	handleRemoveItem = (idx: number) => () => {
		this.setState({
			items: this.state.items.filter((s, sidx) => idx !== sidx),
		});
	};

	render() {
		const { ordererName, items } = this.state;
		const { selectOptions } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<Input
					type="text"
					placeholder="Orderer name"
					value={ordererName}
					onChange={this.handleChange('ordererName')}
				/>

				<h4>Items</h4>

				{items.map((item, idx) => (
					<div className="item" key={idx}>
						<Select
							// type="text"
							// placeholder={`Item #${idx + 1} name`}
							// value={item.name}
							onChange={this.handleItemChange(idx, 'name')}
						>
							{ selectOptions.map( el => 
								<Select.Option value={el.value}>{el.label}</Select.Option>
							)}
						</Select>
						<Input
							type="text"
							placeholder={`Item #${idx + 1} quantity`}
							value={item.quantity}
							onChange={this.handleItemChange(idx, 'quantity')}
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
