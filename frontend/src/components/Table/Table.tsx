import React from "react";
import styled from "styled-components";
import { neutrals } from "../../styles/colors";
import { font } from "../../styles/global";
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Table = ( props: { header: string[], rows: any[], hover?: boolean} & RouteComponentProps ) => {
    const { header, rows, match, history } = props;

    const redirectTo = ( path: string | number ) => history.push(`${match.url}/${path}`)
    const handleClick = (id: number) => (e: any) => props.hover ? redirectTo(id) : null

    return (
        <StyledTable hoverable={props.hover}>
            <thead>
                <tr>
                    {header.map((headerCell: number | string, i: number) => (
                        <th align="left" key={`header-cell-${i}`}>{headerCell}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((row: [number, string], i: number) => (
                    <tr key={`row-${i}`} onClick={ handleClick(row[0]) }>
                        {row.map((cell: string | number, i: number) => (
                            <td key={`row-cell-${i}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

Table.defaultProps = {
    hover: true
}

const StyledTable: any = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    
    th {
        font-weight: normal;
    }

    td, th {
        display: table-cell;
        padding: 4px 56px 4px 24px;
        text-align: left;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        vertical-align: inherit;
        outline: none;
        font-family: ${font};
        font-variant: small-caps;
    }

    th {
        font-size: 0.75rem;
        color: ${neutrals['neutrals-6']};
    }

    tr {
        color: inherit;
        height: 48px;
        display: table-row;
    }

    tbody {
        tr {
            font-size: 0.8125rem;
            color: ${neutrals['neutrals-2']};

            td {
                color: inherit;
                a {
                    font-weight: normal;
                    color: inherit;
                }
            }

            ${ (props: any) => 
                props.hoverable ? `
                &:hover {
                    background: ${neutrals['neutrals-10']}
                }
                ` : ''
            }
        }
    }
`;

const enhancedTable = withRouter(Table);

export { enhancedTable as Table, StyledTable };
