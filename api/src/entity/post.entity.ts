import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Post {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column('text')
  title?: string;

  @Column()
  author?: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column('text')
  content?: string;
}
