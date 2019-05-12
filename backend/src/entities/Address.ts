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

@Entity("Address", { schema: "dbo" })
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "address",
	})
	address: string;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "city",
	})
	city: string;

	@OneToOne(type => Store, store => store.address)
	store: Store;

	@OneToOne(type => Warehouse, warehouse => warehouse.address)
	warehouse: Warehouse;
}
