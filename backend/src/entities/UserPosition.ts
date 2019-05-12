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
import { User } from "./User";

@Entity("UserPosition", { schema: "dbo" })
export class UserPosition {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("nvarchar", {
		nullable: true,
		length: 50,
		name: "name",
	})
    name: string | null;
    
    @OneToMany(type => User, user => user.position)
	user: User | null;
}
