import React from "react";
import { Roles } from "../../types/roles";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { primaryColors, neutrals } from "../../styles/colors";

type HeaderItemType = {
	role: string;
	components: { route: string; path: string }[];
};

const headerItems: Array<HeaderItemType> = [
	{
		role: Roles.admin,
		components: [
			{ route: "Order", path: "/order" },
			{ route: "Delivery", path: "/delivery" },
			{ route: "Warehouse", path: "/warehouse" },
			{ route: "Store", path: "/store" },
			{ route: "Users", path: "/users" },
		],
	},
];

const Header = () => {
	const user = JSON.parse(localStorage.getItem("user") as string);
	const header: HeaderItemType | undefined = headerItems.find(item => item.role === user.role);

	return header ? (
		<StyledHeader>
			<NavLink exact to="/" className="tab" activeClassName="tab-active">
				Home
			</NavLink>
			{header.components.map((el, i) => (
				<NavLink key={i} to={el.path} className="tab" activeClassName="tab-active">
					{el.route}
				</NavLink>
			))}
		</StyledHeader>
	) : null;
};

const StyledHeader = styled.header`
	display: flex;
	justify-content: center;

	.tab {
		padding: 10px 20px;
		text-decoration: none;
		color: ${neutrals["neutrals-5"]};
	}

	.tab-active {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: ${primaryColors["primary-2"]};
		color: ${neutrals["neutrals-10"]};
	}
`;

export default Header;
