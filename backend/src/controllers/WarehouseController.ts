import { getRepository } from "typeorm";
import { Param, Body, Get, Post, Put, Delete, JsonController } from "routing-controllers";
import { Warehouse } from "../entities/Warehouse";
import { ItemWarehouse } from "../entities/ItemWarehouse";
import { Item } from "../entities/Item";

@JsonController("/warehouse")
export class WarehouseController {
	@Post("/")
	create(@Body() body) {
		return getRepository(Warehouse).save(body);
	}

	@Get()
	getAll() {
		return (
			getRepository(Warehouse)
				.createQueryBuilder("warehouse")
				.select()
				.orderBy("warehouse.id")
				.limit(15)
				.getMany()
		);
	}

	@Get("/:id")
	getOne(@Param("id") id: number) {
		return getRepository(Warehouse).findOne({
			where: { id },
			relations: ["itemWarehouses", "address", "itemWarehouses.item"],
		});
	}

	@Put("/:id")
	update(@Body() body: any) {
		return getRepository(Warehouse).save(body);
	}

	@Delete()
	deleteWarehouse(@Param("id") id: number) {
		return getRepository(Warehouse)
			.createQueryBuilder("warehouse")
			.delete()
			.from("warehouse")
			.where("warehouse.id = :id", { id })
			.execute();
	}

	@Post('/populate/:id')
	async populate(@Param("id") id: number, @Body() body: any) {
		const warehouseItems = await getRepository(ItemWarehouse).findOne({
			where: {
				warehouse: id,
				item: body.itemId
			}
		})

		const item = await getRepository(Item).findOne(body.itemId);
		const warehouse = await getRepository(Warehouse).findOne(id);

		if (!warehouseItems) {
			return getRepository(ItemWarehouse).save({
				item,
				itemQuantity: body.itemQuantity,
				warehouse,
			})
		}

		return getRepository(ItemWarehouse).update(warehouseItems, {
			itemQuantity: warehouseItems.itemQuantity + body.itemQuantity
		})
	}
}
