import { MongoDataSource } from '@/config/db.config';
import { Comment } from '@/entity/comment.entity';
import { Post } from '@/entity/post.entity';
import { ObjectId } from 'mongodb';

class CommentService {
  private commentRepository = MongoDataSource.getRepository(Comment);
  private postRepository = MongoDataSource.getRepository(Post);

  async getAllComments() {
    return await this.commentRepository.find();
  }

  async getPostById(id: string): Promise<Post> {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }
    const postId = new ObjectId(id);
    try {
      const post = await this.postRepository.findOneOrFail({
        where: {
          _id: postId,
        },
        relations: {
          comments: true,
        },
      });
      return post;
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }
    const commentId = new ObjectId(id);
    try {
      const comment = await this.commentRepository.findOneOrFail({
        where: {
          _id: commentId,
        },
      });
      return comment;
    } catch (error) {
      throw new Error('Comment not found');
    }
  }

  async findPost(id: ObjectId): Promise<Post> {
    try {
      const post = await this.postRepository.findOneByOrFail({
        _id: id,
      });
      return post;
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    if (!ObjectId.isValid(postId)) {
      throw new Error('Invalid ID');
    }
    const _postId = new ObjectId(postId);
    const comments = await this.commentRepository.find({
      where: {
        postId: _postId,
      },
    });
    return comments;
  }

  async newComment(
    content: string,
    userId: string,
    postId: string,
    parentId: string | null,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.content = content;
    comment.userId = userId;
    comment.postId = (await this.getPostById(postId))!._id;
    comment.createdAt = new Date();
    if (parentId) {
      comment.parent = await this.getCommentById(parentId);
    }
    return comment;
  }

  async addComment(comment: Comment): Promise<Comment> {
    if (!comment.parent) {
      await this.setLeftAndRightForComment(comment);
    } else {
      await this.setLeftAndRightForReply(comment);
    }
    const _comment = await this.commentRepository.save(comment);
    const _post = await this.findPost(_comment.postId!);
    !_post.comments && (_post.comments = []);
    _post.comments.push(_comment._id);
    console.log('Comment added to post:', _post.comments);
    await this.postRepository.save(_post);
    const updatedPost = await this.getPostById(_post._id.toString());
    console.log('Post:', updatedPost.comments);
    return _comment;
  }

  getMaxRight(comments: Comment[]): number {
    if (comments.length === 0) {
      return 0; // or any other default value
    }
    return Math.max(...comments.map((comment) => comment.right || 0));
  }

  async updateRight(comment: Comment): Promise<void> {
    comment.right = comment.right + 2;
    console.log('After updating:', comment.right);
    await this.commentRepository.save(comment);
    if (comment.parent) {
      await this.updateRight(comment.parent);
    }
  }

  async setLeftAndRightForComment(comment: Comment): Promise<void> {
    const comments = await this.getAllComments();
    const maxRight = this.getMaxRight(comments);
    comment.left = maxRight + 1;
    comment.right = maxRight + 2;
    await this.commentRepository.save(comment);
  }

  async setLeftAndRightForReply(comment: Comment): Promise<void> {
    const parent = comment.parent!;
    comment.left = parent.right;
    comment.right = parent.right + 1;
    await this.commentRepository.save(comment);
    await this.updateRight(parent);
    const comments = await this.getAllComments();
    comments
      .filter((_comment) => _comment.left >= comment.right)
      .forEach(async (_comment) => {
        _comment.left += 2;
        _comment.right += 2;
        await this.commentRepository.save(_comment);
      });
  }
}
export default CommentService;