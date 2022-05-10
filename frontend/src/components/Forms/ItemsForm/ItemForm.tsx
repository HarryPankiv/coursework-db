import React from "react";
import Select from "react-select";
import { SelectType } from "../../../types/genericTypes";
import { Button, Form, Input } from "../../../styles/styled";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Prop = {
	itemOptions: any;
	onSubmit: (data: any) => void;
};

type State = Readonly<{
	name: string;
	price: string;
}>;

 class ItemForm extends React.Component<Prop & RouteComponentProps, State> {
	static defaultProps: Prop;
	readonly state: State = {
		name: '',
		price: ''
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
				return fieldValue && fieldValue.map((el: any) => el.value );
			case "date":
				return fieldValue;
			default:
				return null;
		}
	};

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		this.props.onSubmit(this.state);
		this.props.history.push('/items');
	};

	render() {
		const { name, price } = this.state;
		const { itemOptions } = this.props;

		return (
			<Form onSubmit={this.handleSubmit}>
				<h4>Add item</h4>

				<div>
					<h4>Name</h4>
					<Input
						type="text"
						value={name}
						onChange={this.handleChange("text", "name")}
					/>
				</div>
				<div>
					<h4>Price</h4>
					<Input
						type="text"
						value={price}
						onChange={this.handleChange("text", "price")}
					/>
					{ Number.isNaN(Number(price)) && <p>price should be number</p>}
				</div>
				{getSelects(itemOptions).map(select => (
					<WrappedSelect
						name={select.name}
						options={select.options}
						isMulti={select.isMulti}
						onChange={this.handleChange}
					/>
				))}
				<Button type="submit" disabled={ Number.isNaN(Number(price)) }>Add item</Button>
			</Form>
		);
	}
}

const getSelects = (itemOptions: any) => [
	{
		name: "type",
		options: itemOptions.type,
		isMulti: false,
	},
	{
		name: "gender",
		options: itemOptions.gender,
		isMulti: false,
	},
	{
		name: "color",
		options: itemOptions.color,
		isMulti: true,
	},
	{
		name: "size",
		options: itemOptions.size,
		isMulti: true,
	},
];

type WrappedSelectProps = {
	name: string;
	options: [];
	isMulti: boolean;
	onChange: (type: string, field: string) => (value: any) => any;
};

const WrappedSelect = ({ name, options, isMulti, onChange }: WrappedSelectProps) => (
	<div style={{ width: "100%" }}>
		<h4>{name}</h4>
		<Select
			options={options}
			onChange={onChange(`${isMulti ? "multi-" : ""}select`, `${name}${isMulti ? "Ids" : ""}`)}
			isMulti={isMulti}
		/>
	</div>
);

ItemForm.defaultProps = {
	itemOptions: {
		gender: [],
		type: [],
		size: [],
		color: [],
	},
	onSubmit: () => null,
};

export default withRouter(ItemForm);