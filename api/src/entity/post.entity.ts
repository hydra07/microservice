import { ObjectId } from 'mongodb';
import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
@Entity('post')
export class Post extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column('text')
  title?: string;

  @Column('text')
  userId?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column('text')
  content?: string;

  @OneToMany(() => Comment, (comment: Comment) => comment.postId, {
    // cascade: true,
    nullable: true,
  })
  @Column('array')
  comments?: ObjectId[];
}
