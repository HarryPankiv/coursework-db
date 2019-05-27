import React from "react";
import { Button, Input, Form } from "../../../styles/styled";

type Prop = {
	onSubmit: (data: any) => void;
};

type State = Readonly<{}>;

export default class OrderForm extends React.Component<Prop, State> {
	readonly state: State = {};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value } as any);
	};;

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		this.props.onSubmit(this.state);
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<h2>Create Warehouse</h2>
				{inputs.map( (input, index) => (
					<div>
						<h4>{input.label}</h4>
						<Input
							key={index}
							type={input.type && "text"}
							name={input.name}
							onChange={this.handleChange}
						/>
					</div>
				))}
				<Button type="submit">Create</Button>
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
