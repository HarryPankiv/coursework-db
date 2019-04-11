import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	RelationId,
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

	@Column("nchar", {
		nullable: false,
		length: 10,
		name: "size",
	})
	size: string;

	@OneToMany(type => Item, item => item.size)
	items: Item[];
}
