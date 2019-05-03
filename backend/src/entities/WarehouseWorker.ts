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
import { Gender } from "./Gender";
import { Warehouse } from "./Warehouse";

@Entity("WarehouseWorker", { schema: "dbo" })
@Index("itemNameId", ["name"])
export class WarehouseWorker {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "name",
	})
	name: string | null;

	@Column("date", {
		nullable: true,
		name: "birthday",
	})
	birthday: Date | null;

	@OneToOne(type => Gender, gender => gender.warehouseWorker)
	@JoinColumn({ name: "genderId" })
	gender: Gender | null;

	@Column("int", {
		nullable: true,
		name: "salary",
	})
	salary: number | null;

	@ManyToOne(type => Warehouse, warehouse => warehouse.warehouseWorkers, {})
	@JoinColumn({ name: "warehouseId" })
	warehouse: Warehouse | null;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "position",
	})
	position: string | null;
}
