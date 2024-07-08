import { BaseEntity, Column, Entity } from "typeorm";

@Entity("search")
export class Search extends BaseEntity{

    @Column({ type: "text" })
    name!: string;

}