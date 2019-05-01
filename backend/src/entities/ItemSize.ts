import {
	Column,
	Entity,
	ManyToOne
} from "typeorm";
import { Item } from "./Item";

@Entity("ItemSize", { schema: "dbo" })
export class ItemSize {
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

	@ManyToOne(type => Item, item => item.size)
	item: Item;
}
