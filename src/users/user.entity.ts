import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmail } from "class-validator";
import { Role } from "src/users/roles/roles.enum";

@Entity('user')
export class User {
    @PrimaryColumn()
    @Generated("uuid")
    id: string;

    @Column()
    username: string;

    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'simple-array' })
    roles: Role[] = [Role.User]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        try {
            const rounds = bcrypt.getRounds(this.password);
            if (rounds === 0) {
                this.password = await bcrypt.hash(this.password, 10);
            }
        } catch (error) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}
