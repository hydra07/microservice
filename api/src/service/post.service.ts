import { MongoDataSource } from '@/config/db.config';
import { Comment } from '@/entity/comment.entity';
import { Post } from '@/entity/post.entity';
import UserService from '@/service/user.service';
import { ObjectId } from 'mongodb';
class PostService {
  private postRepository = MongoDataSource.getRepository(Post);
  private commentRepository = MongoDataSource.getRepository(Comment);
  private UserService = new UserService();
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
      select: ['_id', 'title', 'image', 'userId'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getAllPosts() {
    return await this.postRepository.find();
    // const post = await this.postRepository.find()
  }

  async getAllComments() {
    return await this.commentRepository.find();
  }

  async getPostWithUser() {
    const post = await this.postRepository.find({
      select: ['_id', 'title', 'image', 'userId', 'createdAt', 'isActivate'],
    });

    const postWithUser = await Promise.all(
      post.map(async (post) => {
        const { userId, ...postWithoutUserId } = post;
        const user = await this.UserService.findUserById(userId!);
        if (user) {
          return {
            ...postWithoutUserId,
            user: {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
            },
          };
        } else {
          return {
            ...postWithoutUserId,
            user: {
              id: undefined,
              username: undefined,
              avatar: undefined,
            },
          };
        }
      }),
    );
    return postWithUser;
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

  async updatePost(id: string, title: string, userId: string, content: string) {
    // const postId = new ObjectId(id);
    try {
      const postToUpdate = await this.getPostById(id);
      postToUpdate.title = title;
      postToUpdate.userId = userId;
      postToUpdate.content = content;
      return await this.postRepository.save(postToUpdate);
    } catch (error) {
      throw new Error('Post not found');
    }
  }
  async deletePost(id: string) {
    try {
      const postToDelete = await this.getPostById(id);
      return await this.postRepository.remove(postToDelete);
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async addPost(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }
  async publicPost(id: string, isActivate: boolean) {
    try {
      const post = await this.postRepository.findOneOrFail({
        where: {
          _id: new ObjectId(id),
        },
        relations: {
          comments: true,
        },
      });
      post.isActivate = isActivate;
      return await this.postRepository.save(post);
    } catch (error) {
      throw new Error('Post not found');
    }
  }
}

export default PostService;
