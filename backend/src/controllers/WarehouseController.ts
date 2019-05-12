import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { Warehouse } from "../entities/Warehouse";

@Controller('/warehouse')
export class WarehouseController {
	@Post("/")
	create(@Body() body) {
		console.log(body);
		return getRepository(Warehouse).create(body);
	}

	@Get()
	getAll() {
		return getRepository(Warehouse)
			.createQueryBuilder("warehouse")
			.select()
			// .leftJoinAndSelect("warehouse.position", "userPosition")
			.orderBy('warehouse.id')
			.getMany();
	}

	@Put()
	update(@Body() body: any) {
		return getRepository(Warehouse)
			.createQueryBuilder("warehouse")
			.update(body)
	}

	@Delete()
    deleteWarehouse(@Param("id") id: number) {
        return getRepository(Warehouse)
			.createQueryBuilder("warehouse")
            .delete()
            .from('warehouse')
            .where("warehouse.id = :id", { id })
            .execute()
    }
}