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

@Entity("Delivery", { schema: "dbo" })
export class Delivery {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@ManyToOne(type => Store, store => store.deliverys, {})
	@JoinColumn({ name: "storeId" })
	store: Store | null;

	@ManyToOne(type => Warehouse, warehouse => warehouse.deliverys, {})
	@JoinColumn({ name: "warehouseId" })
	warehouse: Warehouse | null;

	@Column("date", {
		nullable: true,
		name: "deliveryDate",
	})
	deliveryDate: Date | null;

	@OneToMany(type => DeliveryInvoice, deliveryInvoice => deliveryInvoice.delivery)
	deliveryInvoices: DeliveryInvoice[];
}
