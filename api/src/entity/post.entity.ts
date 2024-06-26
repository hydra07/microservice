import { ObjectId } from 'mongodb';
import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import OrderController from '@/controller/order.controller';

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
  image?: string;

  @Column('text')
  content?: string;

  @OneToMany(() => Comment, (comment: Comment) => comment.postId, {
    // cascade: true,
    nullable: true,
  })
  @Column('array')
  comments?: ObjectId[];

  @Column('boolean')
  isActivate?: boolean = false;

  @Column(() => PostTag)
  tags?: PostTag[];
}

export class PostTag {
  // @ObjectIdColumn()
  // _id!: ObjectId;
  @Column('text')
  name?: string;
}

