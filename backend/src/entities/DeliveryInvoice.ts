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
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Delivery, delivery => delivery.deliveryInvoices, {cascade: true, onDelete: 'CASCADE'})
	@JoinColumn({ name: "deliveryid" })
	delivery: Delivery | null;

	@ManyToOne(type => OrderInvoice, orderInvoice => orderInvoice.deliveryInvoices, {cascade: true, onDelete: 'CASCADE'})
	@JoinColumn({ name: "orderInvoiceId" })
	orderInvoice: OrderInvoice | null;
}
