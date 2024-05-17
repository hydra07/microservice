import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('notification')
export class Notification {
  @ObjectIdColumn()
  _id?: string;

  @Column('text')
  title?: string;

  @Column('text')
  content?: string;

  @Column('date')
  createAt?: Date;

  @Column('text')
  userId?: string;
}
