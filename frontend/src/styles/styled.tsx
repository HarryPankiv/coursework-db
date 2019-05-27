import datePicker from 'react-datepicker'
import styled from 'styled-components';
import select from "react-select";
import { primaryColors, neutrals } from './colors';
import { Link as RouterLink } from 'react-router-dom'

export const DatePicker = styled(datePicker)`
    box-sizing: border-box;
    padding: 9px 8px;
    border: 1px solid hsl(0,0%,80%);
    border-radius: 4px;
    width: 300px;
`

export const Input = styled.input`
    box-sizing: border-box;
    padding: 9px 8px;
    border: 1px solid hsl(0,0%,80%);
    border-radius: 4px;
    width: 300px;
`

export const Select = styled(select)`
    width: 300px;
`

export const Button = styled.button`
    background: ${primaryColors['primary-2']};
    color: ${neutrals['neutrals-8']};
    max-width: 300px;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 12px 20px;
    cursor: pointer;
    transition-duration: 0.3s;
    font-variant: small-caps;

    &:hover {
        transform: translate(2px, -2px);
        box-shadow: -2px 2px 16px -1px rgba(0,0,0,0.3);
    }

    & * {
        margin: 0;
    }

    & a {
        color: inherit;
        text-decoration: none;
    }

    &:disabled {
        cursor: not-allowed;
        background: ${primaryColors['primary-7']};
        color: ${neutrals['neutrals-10']};
        &:hover {
            transform: none;
            box-shadow: none;
        }
    }
`

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	padding: 0 10px;
	background: hsl(221,68%,98%);
	margin: 20px 0;
	box-shadow: 0px 0px 5px 5px  hsl(221,68%,98%);
`;

export const Form = styled.form`
	display: flex;
    flex-direction: column;
    align-items: center;
	max-width: 300px;
    margin: auto;
`

export const Link = styled(RouterLink)`

`