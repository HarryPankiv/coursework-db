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

	@OneToMany(type => ItemType, itemType => itemType.item, { nullable: false })
	type: ItemType[];

	@OneToOne(type => Gender, gender => gender.item, { nullable: false })
	@JoinColumn({ name: "genderId" })
	gender: Gender;

	@OneToMany(type => ItemColor, itemColor => itemColor.item, { nullable: false })
	color: ItemColor[];

	@OneToMany(type => ItemSize, itemSize => itemSize.item, { nullable: false })
	size: ItemSize[];

	@OneToMany(type => DeliveryInvoice, deliveryInvoice => deliveryInvoice.item)
	deliveryInvoices: DeliveryInvoice[];

	@OneToMany(type => ItemWarehouse, itemWarehouse => itemWarehouse.item)
	itemWarehouses: ItemWarehouse[];

	@OneToMany(type => OrderInvoice, orderInvoice => orderInvoice.item)
	orderInvoices: OrderInvoice[];
}
