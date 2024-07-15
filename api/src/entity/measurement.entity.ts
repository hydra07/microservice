import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("measurements")  // Add the @Entity decorator
export class Measurement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'text' })
    name?: string;
    
    @Column({ default: true })
    isActive?: boolean;
}
