import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	RelationId,
	ManyToOne,
} from "typeorm";
import { ItemType } from "./ItemType";
import { Gender } from "./Gender";
import { ItemColor } from "./ItemColor";
import { ItemSize } from "./ItemSize";
import { DeliveryInvoice } from "./DeliveryInvoice";
import { ItemWarehouse } from "./ItemWarehouse";
import { OrderInvoice } from "./OrderInvoice";

@Entity("Item", { schema: "dbo" })
@Index("priceIndex", ["price"])
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@Column("float", {
		nullable: false,
		precision: 53,
		name: "price",
	})
	price: number;

	@ManyToOne(type => Gender, gender => gender.items, { nullable: false })
	@JoinColumn({ name: "genderId" })
	gender: Gender;

	@ManyToOne(type => ItemType, itemType => itemType.items)
	@JoinColumn({ name: "typeId" })
	type: ItemType;

	@ManyToMany(type => ItemColor, itemColor => itemColor.items, { nullable: false })
	@JoinTable({ name: "ItemColorMap" })
	color: ItemColor[];

	@ManyToMany(type => ItemSize, itemSize => itemSize.items, { nullable: false })
	@JoinTable({ name: "ItemSizeMap" })
	size: ItemSize[];

	@OneToMany(type => ItemWarehouse, itemWarehouse => itemWarehouse.item)
	itemWarehouses: ItemWarehouse[];

	@OneToMany(type => OrderInvoice, orderInvoice => orderInvoice.item)
	orderInvoices: OrderInvoice[];
}
