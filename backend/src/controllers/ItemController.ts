import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@Controller()
export class ItemController {
	@Get("/item")
	getAll() {
		return getRepository(Item)
			.createQueryBuilder("item")
			.select(["item.id", "item.name"])
			.leftJoinAndSelect("item.type", "type.id")
			.leftJoinAndSelect("item.color", "color")
			.leftJoinAndSelect("item.size", "size")
			.leftJoinAndSelect("item.gender", "gender")
			.getMany();
	}

	@Get("/item/:id")
	getOne(@Param("id") userId: number) {
		return getRepository(Item).findOne(userId);
	}
}
