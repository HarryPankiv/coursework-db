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
import { OrderInvoice } from "./OrderInvoice";
import { User } from "./User";
import { Delivery } from "./Delivery";

@Entity("Order", { schema: "dbo" })
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Store, store => store.orders, {})
	@JoinColumn({ name: "storeId" })
	store: Store | null;

	@ManyToOne(type => Warehouse, warehouse => warehouse.orders, {})
	@JoinColumn({ name: "warehouseId" })
	warehouse: Warehouse | null;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "status",
	})
	status: string | null;

	@Column("date", {
		nullable: true,
		name: "orderDate",
	})
	orderDate: Date | null;

	@Column("date", {
		nullable: true,
		name: "deadlineDate",
	})
	deadlineDate: Date | null;

	@Column("int", {
		nullable: true,
		name: "totalQuantity",
	})
	totalQuantity: number | null;

	@OneToMany(type => OrderInvoice, orderInvoice => orderInvoice.order, {onDelete: 'CASCADE'})
	orderInvoices: OrderInvoice[];

	@OneToMany(type => Delivery, delivery => delivery.order, {onDelete: 'CASCADE'})
	delivery: Delivery[];

	@ManyToOne(type => User, user => user.id)
	orderer: User;

}
