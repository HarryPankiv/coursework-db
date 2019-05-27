import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from "../../styles/styled";
import { primaryColors, neutrals } from "../../styles/colors";

export const ButtonSwitch = (props: any) => {
	const [active, setActive] = useState(false);

	const handleClick = (e: any) => {
		e.stopPropagation();
		setActive(!active);
		props.onClick(props.id);
	};

	return <SwitcherButton type="button" onClick={handleClick} active={active}>{props.children}</SwitcherButton>;
};

const SwitcherButton: any = styled(Button)`
	background: ${(props: any) => (props.active ? primaryColors['primary-2'] : 'transparent')};
	color: ${(props: any) => (props.active ? neutrals['neutrals-8'] : primaryColors['primary-2'])};
    border: ${(props: any) => (props.active ? '2px solid transparent' : `2px solid ${primaryColors['primary-2']}` )};
`;
