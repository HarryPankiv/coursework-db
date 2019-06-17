import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { storeDomain } from "../../../api/domains/Store";
import { transformAddress } from "../../../helpers/transformAddress";
import { Table } from "../../Table/Table";

const StoreSingle = (props: RouteComponentProps<{ id: string }>) => {
	const storeId = Number(props.match.params.id);
	const [store, setStore] = useState<any>({
		id: null,
		name: "",
		address: {
			address: "",
			city: "",
		},
		users: null
	});

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await storeDomain.getOne(storeId);

			setStore(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			<h2>Store #{store.id}</h2>
			<p>Phone number - {store.phoneNumber}</p>
			<p>Email - {store.email}</p>
			<p>Address - {transformAddress(store.address)}</p>
			<h4>Users</h4>
			{store.users &&
				<Table
					header={['Id', 'Name', 'Email', 'Birthday', 'Phone number', 'Salary']}
					rows={store.users.map((el: any) => Object.values(el))}
					hover={false}
				/>
			}
		</div>
	);
};

export default withRouter(StoreSingle);
