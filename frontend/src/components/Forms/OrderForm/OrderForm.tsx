import React from "react";
import { SelectType } from "../../../types/genericTypes";
import { DatePicker, Select, Button, Input, Item, Form } from "../../../styles/styled";
import dayjs from 'dayjs';
import { transformAddress } from "../../../helpers/transformAddress";

type Prop = {
	itemOptions: any;
	warehouseOptions: SelectType;
	store: any;
	onSubmit: (data: any) => void;
};

type State = Readonly<{
	items: Array<{ itemId: string; quantity: number }>;
	deadlineDate: Date;
	warehouse: number | null;
	totalQuantity: number;
}>;

export default class OrderForm extends React.Component<Prop, State> {
	readonly state: State = {
		items: [],
		deadlineDate: dayjs().add(5, 'day').toDate(),
		warehouse: null,
		totalQuantity: 0
	};

	handleChange = (fieldType: string, fieldName: string) => (filterValue: any) => {
		this.setState({ [fieldName]: this.transformValue(fieldType, filterValue) } as any);
	};

	transformValue = (fieldType: string, fieldValue: any) => {
		switch (fieldType) {
			case "text":
				return fieldValue.target.value;
			case "select":
				return fieldValue ? fieldValue.value : "";
			case "multi-select":
				return fieldValue && fieldValue.map( (el: any) => ({id: el.value}));
			case "date":
				return fieldValue;
			default:
				return null;
		}
	};

	handleItemChange = (fieldType: string, fieldName: string, idx: number) => (fieldValue: any) => {
		const { items } = this.state;

		const newItems = items.map((item, sidx) => {
			if (idx !== sidx) return item;

			return { ...item, [fieldName]: this.transformValue(fieldType, fieldValue) };
		});

		const totalQuantity = newItems.reduce((acc, el) => acc + +el.quantity, 0);

		this.setState({ items: newItems, totalQuantity });
	};

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		this.props.onSubmit(this.state);
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
		const { items, deadlineDate, totalQuantity } = this.state;
		const { itemOptions, warehouseOptions, store } = this.props;

		return (
			<Form onSubmit={this.handleSubmit}>
				<h4>Deadline date</h4>
				<DatePicker
					className="date-picker"
					selected={deadlineDate}
					minDate={dayjs().add(5, 'day').toDate()}
					onChange={this.handleChange("date", "deadlineDate")}
				/>

				<h4>Warehouse</h4>
				<Select options={warehouseOptions} onChange={this.handleChange("select", "warehouse")} />

				<h4>Store</h4>
				<div>
					<p>store name - {store.name}</p>
					<p>address - {transformAddress(store.address)}</p>
				</div>

				<h4>Items</h4>
				{items.map((item, idx) => {
					const currentItem = itemOptions.find(
						(el: any) => Number(el.value) === Number(item.itemId)
					);

					return (
						<Item key={idx}>
							<h4>Item #{idx}</h4>
							<h4>Item Name</h4>
							<Select
								options={itemOptions}
								isClearable={true}
								onChange={this.handleItemChange("select", "itemId", idx)}
							/>

							{currentItem && (
								<>
									<p>item type - {currentItem.type.label}</p>
									<p>gender - {currentItem.gender.label}</p>

									<p>color</p>
									<Select
										isMulti={true}
										options={currentItem.color}
										onChange={this.handleItemChange("multi-select", "colorId", idx)}
									/>
									<p>size</p>
									<Select
										isMulti={true}
										options={currentItem.size}
										onChange={this.handleItemChange("multi-select", "sizeId", idx)}
									/>
									<p>item quantity</p>
									<Input
										type="text"
										placeholder={`Item #${idx + 1} quantity`}
										value={item.quantity}
										onChange={this.handleItemChange("text", "quantity", idx)}
									/>
								</>
							)}

							<Button
								type="button"
								onClick={this.handleRemoveItem(idx)}
								className="small"
							>
								remove item
							</Button>
						</Item>
					);
				})}
				<Button type="button" onClick={this.handleAddItem} className="small">
					Add Item
				</Button>
				<h4>Total - {totalQuantity}</h4>
				<Button type="submit">Order</Button>
			</Form>
		);
	}
}