import {
	Column,
	Entity,
	ManyToOne
} from "typeorm";
import { Item } from "./Item";

@Entity("ItemType", { schema: "dbo" })
export class ItemType {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@ManyToOne(type => Item, item => item.type)
	item: Item;
}
