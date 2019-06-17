import React from "react";
import { Button, Input, Form } from "../../../styles/styled";
import isEqual from 'lodash.isequal'

type Prop = {
	onSubmit: (data: any) => void;
	defaultValues: any;
	isEdit: boolean;
};

type State = Readonly<any>;

export default class WarehouseForm extends React.Component<Prop, State> {
	state = this.props.defaultValues;
	
	componentDidUpdate(prevProps: Prop) {
		if (!isEqual(prevProps.defaultValues, this.props.defaultValues)) {
			this.setState(this.props.defaultValues)
		}
	}
	

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value } as any);
	};;

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		this.props.onSubmit(this.state);
	};

	render() {
		const { handleSubmit, handleChange, state } = this;
		const { isEdit } = this.props

		return (
			<Form onSubmit={handleSubmit}>
				<h2>{isEdit ? 'Update': 'Create'} Warehouse</h2>
				{inputs.map((input: any, index) => (
					<div>
						<h4>{input.label}</h4>
						<Input
							key={index}
							type={input.type && "text"}
							name={input.name}
							onChange={handleChange}
							value={state[input.name]}
						/>
					</div>
				))}
				<Button type="submit">{isEdit ? 'Update': 'Create'}</Button>
			</Form>
		);
	}
}

const inputs = [
	{
		name: "name",
		label: "name"
	},
	{
		name: "email",
		type: "email",
		label: "Email"
	},
	{
		name: "phoneNumber",
		label: "Phone Number"
	},
	{
		name: "width",
		label: "Warehouse width"
	},
	{
		name: "length",
		label: "Warehouse length"
	},
	{
		name: "address",
		label: "address"
	},
	{
		name: "city",
		label: "city"
	},
];
