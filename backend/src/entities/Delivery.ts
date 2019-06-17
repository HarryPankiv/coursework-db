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
import { Store } from "./Store";
import { Warehouse } from "./Warehouse";
import { DeliveryInvoice } from "./DeliveryInvoice";
import { Order } from "./Order";

@Entity("Delivery", { schema: "dbo" })
export class Delivery {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Store, store => store.deliveries, {})
	@JoinColumn({ name: "storeId" })
	store: Store | null;

	@ManyToOne(type => Warehouse, warehouse => warehouse.deliveries, {})
	@JoinColumn({ name: "warehouseId" })
	warehouse: Warehouse | null;

	@Column("date", {
		nullable: true,
		name: "deliveryDate",
	})
	deliveryDate: Date | null;

	@ManyToOne(type => Order, order => order.delivery)
	@JoinColumn({ name: "orderId" })
	order: Order;

	@OneToMany(type => DeliveryInvoice, deliveryInvoice => deliveryInvoice.delivery)
	deliveryInvoices: DeliveryInvoice[];
}
