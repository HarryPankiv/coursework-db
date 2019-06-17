import { getRepository, In } from "typeorm";
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
import { Warehouse } from "../entities/Warehouse";
import { ItemWarehouse } from "../entities/ItemWarehouse";

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
			store: order.store.id,
		};
		const deliveryRecord = await getRepository(Delivery).save(delivery);

		const deliveryInvoices = order.orderInvoices.map(
			orderInvoice => ({ delivery: deliveryRecord.id, order: orderInvoice.id } as any)
		);

		Promise.all(
			body.items.map(async item => {
				const ik = await getRepository(ItemWarehouse).findOne({
					where: {
						warehouse: delivery.warehouse,
						item,
					},
				});
				await getRepository(ItemWarehouse).update(ik, {
					itemQuantity:
						ik.itemQuantity -
						order.orderInvoices.find(el => el.item.id === item).itemQuantity,
				});
			})
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
	}

	@Get("/:id")
	async getOne(@Param("id") id: number) {
		return getRepository(Delivery).findOne(id, {
			relations: [
				"deliveryInvoices",
				"deliveryInvoices.orderInvoice",
				"deliveryInvoices.orderInvoice.item",
			],
		});
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
