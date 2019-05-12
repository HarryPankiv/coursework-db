import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { User } from "../entities/User";

@Controller('/user')
export class UserController {
	@Post("/")
	create(@Body() body) {
		console.log(body);
		return getRepository(User).create(body);
	}

	@Get()
	getAll() {
		return getRepository(User)
			.createQueryBuilder("user")
			.select()
			.leftJoinAndSelect("user.position", "userPosition")
			.orderBy('user.id')
			.getMany();
	}

	@Put('/user')
	update(@Body() body: any) {
		return getRepository(User)
			.createQueryBuilder("user")
			.update(body)
	}

	@Delete()
    deleteUser(@Param("id") id: number) {
        return getRepository(User)
			.createQueryBuilder("user")
            .delete()
            .from('user')
            .where("user.id = :id", { id })
            .execute()
    }
}