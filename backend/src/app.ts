import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { Express } from "express";
import { ItemController } from "./controllers/ItemController";
import { OrderController } from "./controllers/OrderController";

const app: Express = createExpressServer({
	cors: true,
	routePrefix: "api",
	controllers: [ItemController, OrderController],
});

export default app;
