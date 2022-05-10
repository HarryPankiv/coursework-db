import { getRepository } from "typeorm";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { Store } from "../entities/Store";

@JsonController("/store")
export class StoreController {
	@Post("/")
	create(@Body() body) {
		return getRepository(Store).save(body);
	}

	@Get()
	getAll() {
		return getRepository(Store)
			.createQueryBuilder("store")
			.select()
			.leftJoinAndSelect("store.address", "storeAddress")
			.orderBy("store.id")
			.getMany();
	}

	@Get("/:id")
	async getOne() {
		const store = await getRepository(Store)
			.createQueryBuilder("store")
			.select()
			.leftJoinAndSelect("store.address", "storeAddress")
			.leftJoinAndSelect("store.users", "storeWorker")
			.orderBy("store.id")
			.getOne();
		store.users.forEach( user => delete user.password)
		return store;
	}

	@Put("/store")
	update(@Body() body: any) {
		return getRepository(Store)
			.createQueryBuilder("store")
			.update(body);
	}

	@Delete("/:id")
	deleteStore(@Param("id") id: number) {
		return getRepository(Store).delete(id)
	}
}
