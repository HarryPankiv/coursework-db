import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post } from "routing-controllers";
import { Order } from "../entities/Order";

@Controller()
export class OrderController {
	@Post("/order")
	create(@Body() body) {
        console.log(body)
		return getRepository(Order).create(body);
	}
}
