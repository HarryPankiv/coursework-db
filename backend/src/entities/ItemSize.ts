import { Column, Entity, ManyToOne, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";

@Entity("ItemSize", { schema: "dbo" })
export class ItemSize {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@ManyToMany(type => Item, item => item.size)
	items: Item[];
}
