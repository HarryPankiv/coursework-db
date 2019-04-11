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

@Entity("ItemColor", { schema: "dbo" })
export class ItemColor {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("varchar", {
		nullable: false,
		length: 50,
		name: "color",
	})
	color: string;

	@OneToMany(type => Item, item => item.color)
	items: Item[];
}
