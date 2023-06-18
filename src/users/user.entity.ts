import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    @Generated("uuid")
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn()
    created_at: Date;
}
