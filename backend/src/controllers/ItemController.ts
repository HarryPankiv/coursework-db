import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from "routing-controllers";

@JsonController('/item')
export class ItemController {
	@Post()
	async create(@Body() item: any) {
		const itemQb = getRepository(Item).createQueryBuilder("item")
		const insertResult = await itemQb
			.insert()
			.into(Item)
			.values(item)
			.execute()

		const itemId = insertResult.generatedMaps[0].id

		await itemQb
			.relation(Item, "color")
			.of(itemId)
			.add(item.itemColorIds);

		await itemQb
			.relation(Item, "size")
			.of(itemId)
			.add(item.itemSizeIds);

		return itemId;
	}

	@Get()
	getAll() {
		return getRepository(Item)
			.createQueryBuilder("item")
			.select(["item.id", "item.name"])
			.leftJoinAndSelect("item.type", "type")
			.leftJoinAndSelect("item.color", "color")
			.leftJoinAndSelect("item.size", "size")
			.leftJoinAndSelect("item.gender", "gender")
			.orderBy('item.id')
			.getMany();
	}

	@Get("/:id")
	getOne(@Param("id") id: number) {
		return getRepository(Item)
			.createQueryBuilder("item")
			.select(["item.id", "item.name"])
            .where("item.id = :id", { id })
			.leftJoinAndSelect("item.type", "type")
			.leftJoinAndSelect("item.color", "color")
			.leftJoinAndSelect("item.size", "size")
			.leftJoinAndSelect("item.gender", "gender")
			.orderBy('item.id')
			.getOne();
	}

	@Put("/:id")
	async update(@Param("id") id: number, @Body() item: any) {
		const itemToUpdate = await this.getOne(id)
		const colorIds = itemToUpdate.color.map( el => el.id )
		const sizeIds = itemToUpdate.size.map( el => el.id )
		const itemQb = getRepository(Item).createQueryBuilder("item")

		const { itemColorIds, itemSizeIds, ...itemRecord } = item;
		
		await itemQb
			.update(Item)
			.set(itemRecord)
			.where("item.id = :id", { id })
			.execute();

		await itemQb
			.relation(Item, "color")
			.of(id)
			.remove(colorIds)

		await itemQb
			.relation(Item, "color")
			.of(id)
			.add(itemColorIds);

		await itemQb
			.relation(Item, "size")
			.of(id)
			.remove(sizeIds);

		await itemQb
			.relation(Item, "size")
			.of(id)
			.add(itemSizeIds);

		return null;
	}

	@Delete()
    deleteItem(@Param("id") id: number) {
        return getRepository(Item)
			.createQueryBuilder("item")
            .delete()
            .from('item')
            .where("item.id = :id", { id })
            .execute()
    }
}
