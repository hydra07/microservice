import {
  BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity()
  export class CategoryProduct extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: string;
  
    @Column()
    name?: string;
  
    @Column({default: true})
    isActive?: boolean;
  }
  