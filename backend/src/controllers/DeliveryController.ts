import { getRepository } from "typeorm";
import {
	Controller,
	Param,
	Body,
	Get,
	Post,
	Delete,
	Put,
	JsonController,
} from "routing-controllers";
import { Delivery } from "../entities/Delivery";
import { Order } from "../entities/Order";
import { DeliveryInvoice } from "../entities/DeliveryInvoice";

@JsonController("/delivery")
export class DeliveryController {
	@Post()
	async create(@Body() body) {
		await getRepository(Order).update(body.order, { status: "in delivery" });
		const order = await getRepository(Order).findOne({
			where: { id: body.order },
			relations: ["orderInvoices", "orderInvoices.item", "warehouse", "store"],
		});

		const delivery = {
			...body,
			warehouse: order.warehouse.id,
			store: order.store.id
		} 
		const deliveryRecord = await getRepository(Delivery).save(delivery);

		const deliveryInvoices = order.orderInvoices.map(
			orderInvoice => ({ delivery: deliveryRecord.id, order: orderInvoice.id } as any)
		);

		return getRepository(DeliveryInvoice).save(deliveryInvoices);
	}

	@Get()
	getAll() {
		return getRepository(Delivery).find({
			where: {
				status: "not started",
			},
			relations: [
				"deliveryInvoices",
				"warehouse",
				"store",
				"warehouse.address",
				"store.address",
			],
		});
		// return (
		// 	getRepository(Delivery)
		// 		.createQueryBuilder("delivery")
		// 		.select()
		// 		.leftJoinAndSelect("delivery.deliveryInvoices", "deliveryInvoices")
		// 		.orderBy("delivery.id")
		// 		.getMany()
		// );
	}

	@Get("/:id")
	getOne(@Param("id") id: number) {
		return getRepository(Delivery).findOne(id);
	}

	@Put()
	update(@Body() body: any) {
		return getRepository(Delivery)
			.createQueryBuilder("delivery")
			.update(Delivery);
	}

	@Delete("/:id")
	deleteDelivery(@Param("id") id: number) {
		return getRepository(Delivery).delete({ id });
	}
}
