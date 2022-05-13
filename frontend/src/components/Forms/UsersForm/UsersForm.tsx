import React from "react";
import Select from "react-select";
import { SelectType } from "../../../types/genericTypes";
import { Button, Form, Input, DatePicker } from "../../../styles/styled";
import { Roles } from "../../../types/roles";
import dayjs from "dayjs";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Prop = {
	onSubmit: (data: any) => void;
};

type State = Readonly<{
	position: string;
	birthday: Date;
}>;

class UsersForm extends React.Component<Prop & RouteComponentProps, State> {
	readonly state: State = {
		position: "",
		birthday: dayjs()
			.subtract(18, "year")
			.toDate(),
	};

	handleChange = (fieldName: string, fieldType: string) => (fieldValue: any) => {
		this.setState({ [fieldName]: this.transformValue(fieldType, fieldValue) } as any);
	};

	transformValue = (fieldType: string, fieldValue: any) => {
		switch (fieldType) {
			case "text":
				return fieldValue.target.value;
			case "date":
				return fieldValue;
			case "select":
				return fieldValue ? fieldValue.value : "";
			default:
				return null;
		}
	};

	handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		this.props.onSubmit(this.state);

		this.props.history.push('/users')
	};

	render() {
		const { position, birthday } = this.state;
		const isSelectedRoleWarehouseWorker = Roles.warehouseManager === position;
		const isSelectedRoleStoreWorker = Roles.storeWorker === position;
		const isSelectedRoleStoreManager = Roles.storeManager === position;

		return (
			<Form onSubmit={this.handleSubmit}>
				<h2>Create User</h2>
				{inputs.map((input, index) => (
					<div key={index}>
						<h4>{input.label}</h4>
						{input.component(index, this.handleChange(input.name, input.type))}
					</div>
				))}
				<div>
					<h4>Birthday</h4>
					<DatePicker
						selected={birthday}
						onChange={this.handleChange("birthday", "date")}
						maxDate={dayjs()
							.subtract(18, "year")
							.toDate()}
					/>
				</div>
				<div style={{ width: "100%" }}>
					<h4>Gender</h4>
					<Select
						options={[
							{ value: "male", label: "male" },
							{ value: "female", label: "female" },
						]}
						onChange={this.handleChange("gender", "select")}
					/>
				</div>
				<div style={{ width: "100%" }}>
					<h4>Position</h4>
					<Select
						options={Object.values(Roles).map(el => ({ label: el, value: el }))}
						onChange={this.handleChange("position", "select")}
					/>
				</div>
				{isSelectedRoleWarehouseWorker && (
					<div>
						<h4>Warehouse</h4>
						<Input type="text" onChange={this.handleChange("warehouseId", "text")} />
					</div>
				)}
				{isSelectedRoleStoreWorker ||
					(isSelectedRoleStoreManager && (
						<div>
							<h4>Store</h4>
							<Input type="text" onChange={this.handleChange("storeId", "text")} />
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
		label: "name",
		type: "text",
		component: (index: any, handleChange: any) => <Input key={index} onChange={handleChange} />,
	},
	{
		name: "email",
		type: "text",
		label: "Email",
		component: (index: any, handleChange: any) => <Input type="email" key={index} onChange={handleChange} />,
	},
	{
		name: "password",
		label: "password",
		type: "text",
		component: (index: any, handleChange: any) => <Input type="password" key={index} onChange={handleChange} />,
	},
	{
		name: "phoneNumber",
		type: "text",
		label: "phone number",
		component: (index: any, handleChange: any) => <Input key={index} onChange={handleChange} />,
	},

	{
		name: "salary",
		label: "salary",
		type: "text",
		component: (index: any, handleChange: any) => <Input key={index} onChange={handleChange} />,
	},
];

export default withRouter(UsersForm);