import { ObjectId } from "mongodb";
import { MongoDataSource } from "@/config/db.config";
import { Comment } from "@/entity/comment.entity";
import { Post } from "@/entity/post.entity";
class PostService {
  private postRepository = MongoDataSource.getRepository(Post);
  private commentRepository = MongoDataSource.getRepository(Comment);
  async newPost(
    title: string,
    userId: string,
    content: string,
    image: string,
  ): Promise<Post> {
    const post = new Post();
    post.title = title;
    post.userId = userId;
    post.content = content;
    post.image = image;
    post.createdAt = new Date();
    post.comments = [];
    return post;
  }

  // async newComment(
  //   content: string,
  //   userId: string,
  //   postId: string,
  //   parentId: string | null,
  // ): Promise<Comment> {
  //   const comment = new Comment();
  //   comment.content = content;
  //   comment.userId = userId;
  //   comment.postId = (await this.getPostById(postId))!._id;
  //   comment.createdAt = new Date();
  //   if (parentId) {
  //     comment.parent = await this.getCommentById(parentId);
  //   }
  //   return comment;
  // }

  async getListPost() {
    return await this.postRepository.find({
      select: ["_id", "title", "image", "userId"],
      order: {
        createdAt: "DESC",
      },
    });
  }

  async getAllPosts() {
    return await this.postRepository.find();
  }

  async getAllComments() {
    return await this.commentRepository.find();
  }

  async getPostById(id: string): Promise<Post> {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
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
      throw new Error("Post not found");
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
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
      throw new Error("Comment not found");
    }
  }

  async findPost(id: ObjectId): Promise<Post> {
    try {
      const post = await this.postRepository.findOneByOrFail({
        _id: id,
      });
      return post;
    } catch (error) {
      throw new Error("Post not found");
    }
  }

  async updatePost(id: string, title: string, userId: string, content: string) {
    // const postId = new ObjectId(id);
    try {
      const postToUpdate = await this.getPostById(id);
      postToUpdate.title = title;
      postToUpdate.userId = userId;
      postToUpdate.content = content;
      return await this.postRepository.save(postToUpdate);
    } catch (error) {
      throw new Error("Post not found");
    }
  }
  async deletePost(id: string) {
    try {
      const postToDelete = await this.getPostById(id);
      return await this.postRepository.remove(postToDelete);
    } catch (error) {
      throw new Error("Post not found");
    }
  }

  async addPost(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  // async addComment(comment: Comment): Promise<Comment> {
  //   if (!comment.parent) {
  //     await this.setLeftAndRightForComment(comment);
  //   } else {
  //     await this.setLeftAndRightForReply(comment);
  //   }
  //   const _comment = await this.commentRepository.save(comment);
  //   // const _post = await this.getPostById(_comment.postId);
  //   const _post = await this.findPost(_comment.postId!);
  //   !_post.comments && (_post.comments = []);
  //   _post.comments.push(_comment);
  //   console.log('Comment added to post:', _post.comments);
  //   await this.postRepository.save(_post);
  //   const updatedPost = await this.getPostById(_post._id.toString());
  //   console.log('Post:', updatedPost.comments);
  //   return _comment;
  // }

  // getMaxRight(comments: Comment[]): number {
  //   if (comments.length === 0) {
  //     return 0; // or any other default value
  //   }
  //   return Math.max(...comments.map((comment) => comment.right || 0));
  // }

  // async updateRight(comment: Comment): Promise<void> {
  //   comment.right = comment.right + 2;
  //   console.log('After updating:', comment.right);
  //   await this.commentRepository.save(comment);
  //   if (comment.parent) {
  //     await this.updateRight(comment.parent);
  //   }
  // }

  // async setLeftAndRightForComment(comment: Comment): Promise<void> {
  //   const comments = await this.getAllComments();
  //   const maxRight = this.getMaxRight(comments);
  //   comment.left = maxRight + 1;
  //   comment.right = maxRight + 2;
  //   await this.commentRepository.save(comment);
  // }

  // async setLeftAndRightForReply(comment: Comment): Promise<void> {
  //   const parent = comment.parent!;
  //   comment.left = parent.right;
  //   comment.right = parent.right + 1;
  //   await this.commentRepository.save(comment);
  //   await this.updateRight(parent);
  //   const comments = await this.getAllComments();
  //   comments
  //     .filter((_comment) => _comment.left >= comment.right)
  //     .forEach(async (_comment) => {
  //       _comment.left += 2;
  //       _comment.right += 2;
  //       await this.commentRepository.save(_comment);
  //     });
  // }
}

export default PostService;
