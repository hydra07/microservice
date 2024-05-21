import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity("user")
export class User {
  @PrimaryColumn('text')
  id?: string;

  @Column('text')
  username?: string;

  @Column('text', {nullable: true})
  email?: string;

  @Column('text', {nullable: true})
  bio?: string;

  @Column('text', {nullable: true})
  address?: string;

  @Column('text', {nullable: true})
  avatar?: string;

  @Column('text', {nullable: true})
  accessToken?: string;

  @Column('text', {nullable: true})
  refreshToken?: string;
}
