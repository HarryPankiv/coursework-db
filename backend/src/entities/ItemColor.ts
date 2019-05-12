import {
	Column,
	Entity,
	OneToMany,
	ManyToOne,
	ManyToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { Item } from "./Item";

@Entity("ItemColor", { schema: "dbo" })
export class ItemColor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@ManyToMany(type => Item, item => item.color)
	items: Item[];
}
