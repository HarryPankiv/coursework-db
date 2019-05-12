import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity("Gender", { schema: "dbo" })
export class Gender {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: false,
		length: 50,
		name: "name",
	})
	name: string;

	@OneToMany(type => Item, item => item.gender)
	items: Item[];

	@OneToMany(type => User, user => user.gender)
	users: User[];
}
