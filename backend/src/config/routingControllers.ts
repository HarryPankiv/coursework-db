import { RoutingControllersOptions } from "routing-controllers";

export const routingControllersOptions: RoutingControllersOptions = {
	classTransformer: true,
	controllers: ["../controllers/ItemController.ts"],
	cors: true,
	development: true,
	// routePrefix: 'api',
	validation: false,
	defaultErrorHandler: false,
	defaults: {
		nullResultCode: 404,
		undefinedResultCode: 204,
		paramOptions: {
			required: true,
		},
	},
};
