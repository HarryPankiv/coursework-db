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

@Entity("StoreWorker", { schema: "dbo" })
export class StoreWorker {
	@Column("int", {
		nullable: false,
		primary: true,
		name: "id",
	})
	id: number;

	@Column("nchar", {
		nullable: true,
		length: 10,
		name: "name",
	})
	name: string | null;

	@Column("date", {
		nullable: true,
		name: "birthday",
	})
	birthday: Date | null;

	@Column("int", {
		nullable: true,
		name: "salary",
	})
	salary: number | null;

	@ManyToOne(type => Store, store => store.storeWorkers, {})
	store: Store | null;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "position",
	})
	position: string | null;

	@OneToOne(type => Gender, gender => gender.storeWorker)
	@JoinColumn({ name: "genderId" })
	gender: Gender | null;
}
