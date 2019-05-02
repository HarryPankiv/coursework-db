import * as React from "react";
import { Icon, Table, TableBody } from 'semantic-ui-react'
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableCell, TableHead } from "@material-ui/core";

class Warehouse extends React.Component<RouteComponentProps, any> {
	public render() {
		const data: any = [];

		const { url } = this.props.match;

		return <div>
			<Table celled structured>
				<TableHead>
					<TableCell>Id</TableCell>
					<TableCell>Email</TableCell>
					<TableCell>Phone Number</TableCell>
					<TableCell>Width</TableCell>
					<TableCell>Length</TableCell>
				</TableHead>

				<TableBody>
					{data.map( (el: any) => (
						<Table.Row>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.email}</TableCell>
							<TableCell>{el.phoneNumber}</TableCell>
							<TableCell>{el.width}</TableCell>
							<TableCell>{el.length}</TableCell>
							<TableCell>
								<Link to={`${url}/${el.id}`}>
									Items
								</Link>
							</TableCell>
						</Table.Row>
					))}
				</TableBody>
			</Table>
		</div>;
	}
}

export default withRouter(Warehouse)
