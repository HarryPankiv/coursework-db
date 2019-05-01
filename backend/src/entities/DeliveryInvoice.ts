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
import { Delivery } from "./Delivery";
import { OrderInvoice } from "./OrderInvoice";

@Entity("DeliveryInvoice", { schema: "dbo" })
export class DeliveryInvoice {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@OneToOne(type => Item, item => item.deliveryInvoices, {})
	@JoinColumn({ name: "itemId" })
	item: Item | null;

	@ManyToOne(type => Delivery, delivery => delivery.deliveryInvoices, {})
	@JoinColumn({ name: "deliveryid" })
	delivery: Delivery | null;

	@ManyToOne(type => OrderInvoice, orderInvoice => orderInvoice.deliveryInvoices, {})
	@JoinColumn({ name: "orderId" })
	order: OrderInvoice | null;

	@Column("int", {
		nullable: true,
		name: "itemQuantity",
	})
	itemQuantity: number | null;
}
