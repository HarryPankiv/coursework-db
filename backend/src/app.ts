import "reflect-metadata";
import { createExpressServer, Action } from "routing-controllers";
import { Express } from "express";
import { Controllers } from "./controllers";

const app: Express = createExpressServer({
	cors: true,
	routePrefix: "api",
	controllers: Controllers,
	// authorizationChecker: async (action: Action, roles: string[]) => {
	//     // here you can use request/response objects from action
	//     // also if decorator defines roles it needs to access the action
	//     // you can use them to provide granular access check
	//     // checker must return either boolean (true or false)
	//     // either promise that resolves a boolean value
	//     // demo code:
	//     const token = action.request.headers["authorization"];

	//     const user = await getEntityManager().findOneByToken(User, token);
	//     if (user && !roles.length)
	//         return true;
	//     if (user && roles.find(role => user.roles.indexOf(role) !== -1))
	//         return true;

	//     return false;
	// }
});

export default app;
