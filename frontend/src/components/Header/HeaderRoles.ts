import { Roles } from "../../types/roles";

export type HeaderItemType = {
	role: string;
	components: { route: string; path: string; subpath?: string }[];
};

export const headerItems: Array<HeaderItemType> = [
	{
		role: Roles.admin,
		components: [
			{ route: "Order", path: "order", subpath: "/new" },
			{ route: "Delivery", path: "delivery", subpath: "/new" },
			{ route: "Warehouse", path: "warehouse", subpath: "/new" },
			{ route: "Store", path: "store", subpath: "/new" },
			{ route: "Items", path: "items", subpath: "/new" },
			{ route: "Users", path: "users", subpath: "/new" },
		],
	},
	{
		role: Roles.storeManager,
		components: [
			{ route: "Order", path: "order", subpath: "/new" },
			{ route: "Delivery", path: "delivery" },
			{ route: "Warehouse", path: "warehouse" },
			{ route: "Store", path: "store" },
			{ route: "Items", path: "items" },
		],
	},
	{
		role: Roles.storeWorker,
		components: [
			{ route: "Order", path: "order" },
			{ route: "Delivery", path: "delivery" },
			{ route: "Warehouse", path: "warehouse" },
			{ route: "Store", path: "store" },
			{ route: "Items", path: "items" },
		],
	},
	{
		role: Roles.warehouseManager,
		components: [
			{ route: "Order", path: "order" },
			{ route: "Delivery", path: "delivery", subpath: "/new" },
			{ route: "Warehouse", path: "warehouse" },
			{ route: "Store", path: "store" },
			{ route: "Items", path: "items" },
			{ route: "Users", path: "users" },
		],
	},
];