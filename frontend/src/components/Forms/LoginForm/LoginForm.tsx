import React, { useState } from "react";
import { Formik, Field, FormikProps } from "formik";
import { Button, Input, Form } from "../../../styles/styled";
import { userDomain } from "../../../api/domains/User";
import { withRouter, RouteComponentProps } from "react-router";

const LoginForm = (props: RouteComponentProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

        try {
            const user = await userDomain.login({ email, password });
			localStorage.setItem("user", JSON.stringify(user.data));
			props.history.push("/order");
        } catch(e) {
			setError(true);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h4>Email</h4>
			<Input
				value={email}
				type="email"
				onChange={e => setEmail(e.target.value)}
				name="email"
			/>
			<h4>Password</h4>
			<Input
				name="password"
				type="password"
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>
			{error && <p>Email or password is incorrect</p>}
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default withRouter(LoginForm);
