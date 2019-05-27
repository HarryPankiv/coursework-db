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
import { Gender } from "./Gender";
import { Order } from "./Order";
import { UserPosition } from "./UserPosition";
import { Warehouse } from "./Warehouse";

@Entity("User", { schema: "dbo" })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "name",
	})
	name: string | null;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "email",
	})
	email: string | null;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "password",
	})
	password: string | null;

	@Column("date", {
		nullable: true,
		name: "birthday",
	})
	birthday: Date | null;

	@Column("int", {
		nullable: true,
		name: "phoneNumber",
	})
	phoneNumber: number | null;

	@Column("int", {
		nullable: true,
		name: "salary",
	})
	salary: number | null;

	@ManyToOne(type => Gender, gender => gender.users)
	gender: Gender | null;

	@ManyToOne(type => Store, store => store.users, {})
	store: Store | null;

	@ManyToOne(type => Warehouse, warehouse => warehouse.users, {})
	warehouse: Warehouse | null;

	@ManyToOne(type => UserPosition, position => position.user)
	position: UserPosition | null;

	@OneToMany(type => Order, order => order.orderer)
	orders: Order[];
}
