import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import { primaryColors, neutrals } from "../../styles/colors";
import { Button } from "../../styles/styled";
import { headerItems, HeaderItemType } from "./HeaderRoles";

const Header = (props: any) => {
	const handleLogout = () => {
		localStorage.removeItem('user')
		props.history.push('/login')
	}

	const user = JSON.parse(localStorage.getItem("user") as string);
	let header: HeaderItemType | undefined;
	if ( user ) {
		header = headerItems.find(item => item.role === user.position.name);
	}

	return user && header ? (
		<StyledHeader>
			{/* <NavLink exact to="/" className="tab" activeClassName="tab-active">
				Home
			</NavLink> */}
			{header.components.map((el, i) => (
				<NavLink
					className='tab'
					activeClassName='tab-active'
					to={'/' + el.path}
					key={i}
				>
					{el.route}
				</NavLink>
			))}
			<Button onClick={handleLogout}>logout</Button>
		</StyledHeader>
	) : null;
};

const StyledHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: baseline;

	.tab {
		display: flex;
		align-items: center;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		transition-duration: 0.3s;
		cursor: pointer;
		padding: 12px 20px;
		margin: 0;
		text-decoration: none;
		color: ${neutrals["neutrals-5"]};

		&:hover {
			background: ${primaryColors["primary-10"]};
		}
	}

	.tab-active {
		background-color: ${primaryColors["primary-6"]}!important;
		color: ${neutrals["neutrals-10"]};
	}
`;

export default withRouter(Header);
