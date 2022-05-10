import { getRepository } from "typeorm";
import { Item } from "../entities/Item";
import {
	Controller,
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete,
	JsonController,
} from "routing-controllers";
import { Gender } from "../entities/Gender";
import { ItemColor } from "../entities/ItemColor";
import { ItemSize } from "../entities/ItemSize";
import { ItemType } from "../entities/ItemType";

@JsonController("/item")
export class ItemController {
	@Post()
	async create(@Body() item: any) {
		item.price = Number(item.price);

		const itemQb = getRepository(Item).createQueryBuilder("item");
		const insertResult = await itemQb
			.insert()
			.into(Item)
			.values(item)
			.execute();

		const itemId = insertResult.generatedMaps[0].id;

		await itemQb
			.relation(Item, "color")
			.of(itemId)
			.add(item.colorIds);

		await itemQb
			.relation(Item, "size")
			.of(itemId)
			.add(item.sizeIds);

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
			.orderBy("item.id")
			.getMany();
	}

	

	@Get('/options')
	async getOptions() {
		const itemColors = await getRepository(ItemColor).find()
		const itemSizes = await getRepository(ItemSize).find()
		const itemTypes = await getRepository(ItemType).find()
		const genders = await getRepository(Gender).find()

		const itemOptions = {
			color: itemColors.map( itemColor => ({ label: itemColor.name, value: itemColor.id })),
			size: itemSizes.map( itemSize => ({ label: itemSize.name, value: itemSize.id })),
			type: itemTypes.map( itemType => ({ label: itemType.name, value: itemType.id })),
			gender: genders.map( gender => ({ label: gender.name, value: gender.id }))
		}

		return itemOptions
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
			.orderBy("item.id")
			.getOne();
	}

	@Put("/:id")
	async update(@Param("id") id: number, @Body() item: any) {
		const itemToUpdate = await this.getOne(id);
		const itemToUpdatecolorIds = itemToUpdate.color.map(el => el.id);
		const itemToUpdatesizeIds = itemToUpdate.size.map(el => el.id);
		const itemQb = getRepository(Item).createQueryBuilder("item");

		const { colorIds, sizeIds, ...itemRecord } = item;

		await itemQb
			.update(Item)
			.set(itemRecord)
			.where("item.id = :id", { id })
			.execute();

		await itemQb
			.relation(Item, "color")
			.of(id)
			.remove(itemToUpdatecolorIds);

		await itemQb
			.relation(Item, "color")
			.of(id)
			.add(colorIds);

		await itemQb
			.relation(Item, "size")
			.of(id)
			.remove(itemToUpdatesizeIds);

		await itemQb
			.relation(Item, "size")
			.of(id)
			.add(sizeIds);

		return null;
	}

	@Delete('/:id')
	deleteItem(@Param("id") id: number) {
		return getRepository(Item)
			.createQueryBuilder("item")
			.delete()
			.from("item")
			.where("item.id = :id", { id })
			.execute();
	}
}