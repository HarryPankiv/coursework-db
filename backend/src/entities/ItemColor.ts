import {
	Column,
	Entity,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Item } from "./Item";

@Entity("ItemColor", { schema: "dbo" })
export class ItemColor {
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

	@ManyToOne(type => Item, item => item.color)
	item: Item;
}
