import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	JoinColumn,
	OneToMany,
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

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@ManyToOne(type => Item, item => item.gender)
	item: Item;

	@OneToMany(type => StoreWorker, storeWorker => storeWorker.gender)
	storeWorker: StoreWorker[];

	@OneToMany(type => WarehouseWorker, warehouseWorker => warehouseWorker.gender)
	warehouseWorker: WarehouseWorker[];
}
