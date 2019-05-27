import React from "react";
import { Roles } from "../types/roles";
import { Redirect } from "react-router";

export const Authorize = (WrappedComponent: any, allowedRoles: Roles[], ...props: any) => {
	return class WithAuthorization extends React.Component {
		render() {
			const user: any = JSON.parse(localStorage.getItem("user") as string);

			if (user && allowedRoles.includes(user.position.name)) {
				return <WrappedComponent {...props} />;
			} else {
				return <Redirect to="/login" />;
			}
		}
	};
};
