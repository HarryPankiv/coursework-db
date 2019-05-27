import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity("ItemType", { schema: "dbo" })
export class ItemType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@OneToMany(type => Item, item => item.type)
	items: Item[];
}
