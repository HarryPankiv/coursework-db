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
import { StoreWorker } from "./StoreWorker";
import { WarehouseWorker } from "./WarehouseWorker";

@Entity("Gender", { schema: "dbo" })
export class Gender {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("nchar", {
		nullable: false,
		length: 10,
		name: "gender",
	})
	gender: string;

	@OneToMany(type => Item, item => item.gender)
	items: Item[];

	@OneToMany(type => StoreWorker, storeWorker => storeWorker.gender)
	storeWorkers: StoreWorker[];

	@OneToMany(type => WarehouseWorker, warehouseWorker => warehouseWorker.gender)
	warehouseWorkers: WarehouseWorker[];
}
