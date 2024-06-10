import { ObjectId } from 'mongodb';
import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('comment')
export class Comment extends BaseEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column('text')
  content?: string;

  @Column('text')
  userId?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
  })
  @Column(() => ObjectId)
  postId?: ObjectId;

  @Column()
  left!: number;

  @Column()
  right!: number;

  @Column(() => ObjectId)
  parentId?: ObjectId;

  // @Column()
  // @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
  // parent?: Comment | null; // null means it's a root comment

  // @ManyToOne(() => Comment, (comment) => comment.parent, { nullable: true })
  // children?: Comment[];
}
