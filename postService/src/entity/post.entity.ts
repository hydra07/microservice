import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Post {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column('text')
  content?: string;

  @Column('text')
  title?: string;
}