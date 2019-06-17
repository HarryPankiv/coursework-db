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
import { Order } from "./Order";
import { DeliveryInvoice } from "./DeliveryInvoice";

@Entity("OrderInvoice", { schema: "dbo" })
export class OrderInvoice {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Item, item => item.orderInvoices, {})
	@JoinColumn({ name: "itemId" })
	item: Item | null;

	@Column("int", {
		nullable: true,
		name: "itemQuantity",
	})
	itemQuantity: number | null;

	@ManyToOne(type => Order, order => order.orderInvoices, {cascade: true, onDelete: 'CASCADE'})
	@JoinColumn({ name: "orderId" })
	order: Order | null;

	@OneToMany(type => DeliveryInvoice, deliveryInvoice => deliveryInvoice.orderInvoice)
	deliveryInvoices: DeliveryInvoice[];
}
