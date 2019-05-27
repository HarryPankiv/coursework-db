import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { Warehouse } from "../entities/Warehouse";

@Controller("/warehouse")
export class WarehouseController {
	@Post("/")
	create(@Body() body) {
		return getRepository(Warehouse).create(body);
	}

	@Get()
	getAll() {
		return (
			getRepository(Warehouse)
				.createQueryBuilder("warehouse")
				.select()
				// .leftJoinAndSelect("warehouse.position", "userPosition")
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

	@Put()
	update(@Body() body: any) {
		return getRepository(Warehouse)
			.createQueryBuilder("warehouse")
			.update(body);
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
}
