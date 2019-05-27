import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, QueryParams } from "routing-controllers";
import { User } from "../entities/User";

@JsonController("/user")
export class UserController {
	@Get("/login")
	login(@QueryParams() { email, password } ) {
		return getRepository(User).findOne({ where: { email, password }, relations: ['position'] });
	}

	@Post("/")
	create(@Body() body) {
		return getRepository(User).create(body);
	}

	@Get()
	getAll() {
		return getRepository(User)
			.createQueryBuilder("user")
			.select()
			.leftJoinAndSelect("user.position", "userPosition")
			.orderBy("user.id")
			.getMany();
	}

	@Put()
	update(@Body() body: any) {
		return getRepository(User)
			.createQueryBuilder("user")
			.update(body);
	}

	@Delete()
	deleteUser(@Param("id") id: number) {
		return getRepository(User)
			.createQueryBuilder("user")
			.delete()
			.from("user")
			.where("user.id = :id", { id })
			.execute();
	}
}
