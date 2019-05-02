import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { TableHead, TableCell, TableRow } from "@material-ui/core";

class Order extends React.Component<RouteComponentProps, any> {
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

export default withRouter(Order)
