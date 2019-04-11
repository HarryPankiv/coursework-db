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

	@Column("float", {
		nullable: false,
		precision: 53,
		name: "price",
	})
	price: number;

	@ManyToOne(type => ItemType, itemType => itemType.items, { nullable: false })
	@JoinColumn({ name: "typeId" })
	type: ItemType | null;

	@ManyToOne(type => Gender, gender => gender.items, { nullable: false })
	@JoinColumn({ name: "genderId" })
	gender: Gender | null;

	@ManyToOne(type => ItemColor, itemColor => itemColor.items, { nullable: false })
	@JoinColumn({ name: "colorId" })
	color: ItemColor | null;

	@ManyToOne(type => ItemSize, itemSize => itemSize.items, { nullable: false })
	@JoinColumn({ name: "sizeId" })
	size: ItemSize | null;

	@OneToMany(type => DeliveryInvoice, deliveryInvoice => deliveryInvoice.item)
	deliveryInvoices: DeliveryInvoice[];

	@OneToMany(type => ItemWarehouse, itemWarehouse => itemWarehouse.item)
	itemWarehouses: ItemWarehouse[];

	@OneToMany(type => OrderInvoice, orderInvoice => orderInvoice.item)
	orderInvoices: OrderInvoice[];
}
