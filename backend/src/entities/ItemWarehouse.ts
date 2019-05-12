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
import { Warehouse } from "./Warehouse";

@Entity("ItemWarehouse", { schema: "dbo" })
@Index("itemQuantity", ["itemQuantity"])
@Index("itemQuantityIndex", ["itemQuantity"])
export class ItemWarehouse {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Item, item => item.itemWarehouses, {})
	@JoinColumn({ name: "itemId" })
	item: Item | null;

	@ManyToOne(type => Warehouse, warehouse => warehouse.itemWarehouses, {})
	@JoinColumn({ name: "warehouseId" })
	warehouse: Warehouse | null;

	@Column("int", {
		nullable: true,
		name: "itemQuantity",
	})
	itemQuantity: number | null;

	@Column("int", {
		nullable: true,
		name: "xPosition",
	})
	xPosition: number | null;

	@Column("int", {
		nullable: true,
		name: "yPosition",
	})
	yPosition: number | null;
}
