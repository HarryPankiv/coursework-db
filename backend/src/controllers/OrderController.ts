import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, JsonController, Delete } from "routing-controllers";
import { Order } from "../entities/Order";

@JsonController()
export class OrderController {
	@Post("/order")
	create(@Body() body) {
		console.log(body);
		return getRepository(Order).create(body);
	}

	@Get('/order/:id')
	getOne(@Param("id") id: number) {
		return getRepository(Order)
			.createQueryBuilder("order")
			.select()
            .where("order.id = :id", { id })
			.leftJoinAndSelect("order.orderInvoices", "orderInvoices")
			.leftJoinAndSelect("orderInvoices.item", "item")
			.leftJoinAndSelect("item.color", "color")
			.leftJoinAndSelect("item.size", "size")
			.leftJoinAndSelect("item.type", "type")
			.leftJoinAndSelect("item.gender", "gender")
			.leftJoinAndSelect("order.orderer", 'orderer')
			.leftJoinAndSelect("order.store", 'store')
			.leftJoinAndSelect("store.address", 'address')
			.orderBy('order.id')
			.getOne();
	}

	@Get('/order')
	getAll() {
		return getRepository(Order)
			.createQueryBuilder("order")
			.select()
			.leftJoinAndSelect("order.orderInvoices", "orderInvoices")
			.leftJoinAndSelect("order.orderer", 'orderer')
			.leftJoinAndSelect("order.store", 'store')
			.leftJoinAndSelect("store.address", 'address')
			.orderBy('order.id')
			.getMany();
	}

	@Put('/order')
	update(@Body() body: any) {
		return getRepository(Order)
			.createQueryBuilder("order")
			.update(body)
	}

	@Delete()
    deleteOrder(@Param("id") id: number) {
        return getRepository(Order)
			.createQueryBuilder("order")
            .delete()
            .from('order')
            .where("order.id = :id", { id })
            .execute()
    }
}