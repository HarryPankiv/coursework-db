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

@Entity("ItemType", { schema: "dbo" })
export class ItemType {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "type",
	})
	type: string | null;

	@OneToMany(type => Item, item => item.type)
	items: Item[];
}
