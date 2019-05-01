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
import { Address } from "./Address";
import { Delivery } from "./Delivery";
import { ItemWarehouse } from "./ItemWarehouse";
import { Order } from "./Order";
import { WarehouseWorker } from "./WarehouseWorker";

@Entity("Warehouse", { schema: "dbo" })
export class Warehouse {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "email",
	})
	email: string;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "phoneNumber",
	})
	phoneNumber: string;

	@Column("float", {
		nullable: false,
		precision: 53,
		name: "width",
	})
	width: number;

	@Column("float", {
		nullable: false,
		precision: 53,
		name: "length",
	})
	length: number;

	@ManyToOne(type => Address, address => address.warehouse, { nullable: false })
	@JoinColumn({ name: "addressId" })
	address: Address | null;

	@OneToMany(type => Delivery, delivery => delivery.warehouse)
	deliveries: Delivery[];

	@OneToMany(type => ItemWarehouse, itemWarehouse => itemWarehouse.warehouse)
	itemWarehouses: ItemWarehouse[];

	@OneToMany(type => Order, order => order.warehouse)
	orders: Order[];

	@OneToMany(type => WarehouseWorker, warehouseWorker => warehouseWorker.warehouse)
	warehouseWorkers: WarehouseWorker[];
}
