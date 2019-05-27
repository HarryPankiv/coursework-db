import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import {
	Controller,
	Param,
	Body,
	Get,
	Post,
	Put,
	JsonController,
	Delete,
} from "routing-controllers";
import { Order } from "../entities/Order";
import { OrderInvoice } from "../entities/OrderInvoice";

@JsonController("/order")
export class OrderController {
	@Post()
	async create(@Body() body) {
		const invoices: OrderInvoice[] = body.orderInvoices;
		delete body.orderInvoices;
		const savedOrder = await getRepository(Order).save(body);
		invoices.forEach(el => (el.order = savedOrder.id));
		await getRepository(OrderInvoice).save(invoices);
		return null;
	}

	@Get("/:id")
	getOne(@Param("id") id: number) {
		return getRepository(Order).findOne({
			where: { id },
			relations: [
				"orderInvoices",
				"orderInvoices.item",
				"orderInvoices.item.color",
				"orderInvoices.item.size",
				"orderInvoices.item.type",
				"orderInvoices.item.gender",
				"orderer",
				"store",
				"store.address",
				"warehouse",
				"warehouse.address",
			],
		});
		// .createQueryBuilder("order")
		// .select()
		// .where("order.id = :id", { id })
		// .leftJoinAndSelect("order.orderInvoices", "orderInvoices")
		// .leftJoinAndSelect("orderInvoices.item", "item")
		// .leftJoinAndSelect("item.color", "color")
		// .leftJoinAndSelect("item.size", "size")
		// .leftJoinAndSelect("item.type", "type")
		// .leftJoinAndSelect("item.gender", "gender")
		// .leftJoinAndSelect("order.orderer", "orderer")
		// .leftJoinAndSelect("order.store", "store")
		// .leftJoinAndSelect("store.address", "store.address")
		// .leftJoinAndSelect("order.warehouse", "warehouse")
		// .leftJoinAndSelect("warehouse.address", "warehouse.address")
		// .orderBy("order.id")
		// .getOne();
	}

	@Get()
	getAll() {
		return getRepository(Order)
			.createQueryBuilder("order")
			.select()
			.leftJoinAndSelect("order.orderInvoices", "orderInvoices")
			.leftJoinAndSelect("orderInvoices.item", "item")
			.leftJoinAndSelect("order.orderer", "orderer")
			.leftJoinAndSelect("order.store", "store")
			.leftJoinAndSelect("store.address", "address")
			.orderBy("order.id")
			.getMany();
	}

	@Get("/:id/all")
	getAllByWarehouseId(@Param("id") id: number) {
		return getRepository(Order).find({
			where: { warehouse: id },
			relations: ["orderInvoices", "orderInvoices.item"],
		});
	}

	@Put("/:id")
	update(@Body() body: any) {
		return getRepository(Order)
			.createQueryBuilder("order")
			.update(body);
	}

	@Delete("/:id")
	deleteOrder(@Param("id") id: number) {
		return getRepository(Order).delete(id);
		// .createQueryBuilder("order")
		// .delete()
		// .from("order")
		// .where("order.id = :id", { id })
		// .execute();
	}
}
