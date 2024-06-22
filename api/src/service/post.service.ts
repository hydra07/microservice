import { MongoDataSource } from '@/config/db.config';
import { notificationService } from '@/config/socket.config';
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

  async getPostWithUser(tag?: string, skip?: number, take?: number) {
    const query: any = {};
    const options: any = {
      order: {
        createdAt: 'DESC',
      },
    };
    if (tag) {
      query.tags = { name: tag };
    }

    if (take) {
      options.take = take; // Giới hạn số lượng kết quả
    }
    if (skip) {
      options.skip = skip; // Bỏ qua số lượng kết quả
    }
    // console.log(tag, skip, take);
    query.isActivate = true;
    const [posts, total] = await this.postRepository.findAndCount({
      where: query,
      select: [
        '_id',
        'title',
        'image',
        'userId',
        'createdAt',
        'isActivate',
        'tags',
      ],
      ...options,
    });

    const postWithUser = await Promise.all(
      posts.map(async (post) => {
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
    return { postWithUser, total };
  }

  async getPostById(id: string): Promise<any> {
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
      console.log(JSON.stringify(post));
      const postWithUser = await (async () => {
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
      })();
      return postWithUser;
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
      notificationService.createNotification({
        title: `Bài đăng "${post.title}" của bạn đã được ${
          isActivate ? 'công khai' : 'ẩn'
        }`,
        content: `Post ${isActivate ? 'activated' : 'deactivated'}`,
        userId: post.userId,
        createdAt: new Date(),
      });
      return await this.postRepository.save(post);
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async addTagToPost(id: string, tags: string[]) {
    try {
      const post = await this.postRepository.findOneOrFail({
        where: {
          _id: new ObjectId(id),
        },
      });
      post.tags = tags.map((tag) => ({ name: tag }));
      return await this.postRepository.save(post);
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async getAllUniqueTags() {
    const posts = await this.postRepository.find({
      select: ['tags'],
    });
    // Filter out null values after mapping
    const allTags = posts
      .flatMap((post) => post.tags?.map((tag) => tag.name) ?? [])
      .filter((tagName) => tagName !== null);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags;
  }

  async getAllPostByTag(tag: string) {
    const post = await this.postRepository.find({
      select: [
        '_id',
        'title',
        'image',
        'userId',
        'createdAt',
        'isActivate',
        'tags',
      ],
      where: {
        tags: {
          name: tag,
        },
      },
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
}

export default PostService;
