import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@Controller()
export class ItemController {
	@Get("/item")
	getAll() {
		return getRepository(Item).find({ select: ["id", "name"]});
	}

	@Get("/item/:id")
	getOne(@Param("id") userId: number) {
		return getRepository(Item).findOne(userId);
	}
}
