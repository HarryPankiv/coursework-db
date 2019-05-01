import { EntityRepository, Repository } from "typeorm";
import { Item } from "../entities_old/Item";

@EntityRepository(Item)
export default class ItemRepository extends Repository<Item> {
	async findAll() {
		return this.createQueryBuilder().getMany();
	}
}
