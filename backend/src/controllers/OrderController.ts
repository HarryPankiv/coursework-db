import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Patch } from "routing-controllers";
import { Order } from "../entities/Order";

@Controller()
export class OrderController {
	@Post("/order")
	create(@Body() body) {
		console.log(body);
		return getRepository(Order).create(body);
	}

	@Get('/order')
	getAll() {
		return getRepository(Order)
			.createQueryBuilder("order")
			.select()
			.leftJoinAndSelect("order.orderInvoices", "orderInvoices")
			.orderBy('order.id')
			.getMany();
	}

	@Patch('/order')
	update(@Body() body: any) {
		return getRepository(Order)
			.createQueryBuilder("order")
			.update(body)
	}
}