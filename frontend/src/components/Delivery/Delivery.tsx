import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Delivery extends React.Component<RouteComponentProps, any> {
	public render() {
		const data: any = [];

		const { url } = this.props.match;
		
		return <div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>ordererName</TableCell>
						<TableCell>deliveryAddress</TableCell>
						<TableCell>status</TableCell>
						<TableCell>orderDate</TableCell>
						<TableCell>deadlineDate</TableCell>
						<TableCell>totalQuantity</TableCell>
						<TableCell>Items</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{data.map( (el: any) => (
						<TableRow>
							<TableCell>{el.id}</TableCell>
							<TableCell>{el.ordererName}</TableCell>
							<TableCell>{el.deliveryAddress}</TableCell>
							<TableCell>{el.status}</TableCell>
							<TableCell>{el.orderDate}</TableCell>
							<TableCell>{el.deadlineDate}</TableCell>
							<TableCell>{el.totalQuantity}</TableCell>
							<TableCell>
								<Link to={`${url}/${el.id}`}>
									Items
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>;
	}
}

export default withRouter(Delivery)
