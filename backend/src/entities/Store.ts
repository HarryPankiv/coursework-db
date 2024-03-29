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
import { Order } from "./Order";
import { User } from "./User";

@Entity("Store", { schema: "dbo" })
export class Store {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(type => Address, address => address.store, { nullable: false, cascade: true })
	@JoinColumn({ name: "addressId" })
	address: Address | null;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@Column("nchar", {
		nullable: true,
		length: 10,
		name: "phoneNumber",
	})
	phoneNumber: string | null;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "email",
	})
	email: string | null;

	@OneToMany(type => Delivery, delivery => delivery.store)
	deliveries: Delivery[];

	@OneToMany(type => Order, order => order.store)
	orders: Order[];

	@OneToMany(type => User, user => user.store)
	users: User[];
}
