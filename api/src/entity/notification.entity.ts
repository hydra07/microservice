import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('notification')
export class Notification {
  @ObjectIdColumn()
  _id?: string;

  @Column('text')
  title?: string;

  @Column('text')
  content?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column('text')
  userId?: string;
}
