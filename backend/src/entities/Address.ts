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
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
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

	@ManyToOne(type => Store, store => store.address)
	store: Store;

	@ManyToOne(type => Warehouse, warehouse => warehouse.address)
	warehouse: Warehouse;
}
