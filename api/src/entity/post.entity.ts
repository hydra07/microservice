import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('post')
export class Post {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column('text')
  title?: string;

  @Column()
  author?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column('text')
  content?: string;
}
