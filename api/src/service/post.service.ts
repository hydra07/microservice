import { ObjectId } from 'mongodb';
// import { ObjectId } from 'typeorm';
import AppDataSource from '../config/db.config';
import { Post } from '../entity/post.entity';

class PostService {
  // private postRepository = getConnection().getRepository(Post);
  private postRepository = AppDataSource.getRepository(Post);
  async createPost(title: string, author: string, content: string) {
    const newPost = this.postRepository.create({
      title,
      author,
      content,
    });
    return await this.postRepository.save(newPost);
  }

  async getAllPosts() {
    return await this.postRepository.find();
  }

  async getPostById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }
    const postId = new ObjectId(id);
    try {
      const post = await this.postRepository.findOneOrFail({
        where: {
          _id: postId,
        },
      });
      return post;
    } catch (error) {
      throw new Error('Post not found');
    }
  }

  async updatePost(id: string, title: string, author: string, content: string) {
    // const postId = new ObjectId(id);
    try {
      const postToUpdate = await this.getPostById(id);
      postToUpdate.title = title;
      postToUpdate.author = author;
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
}

export default PostService;
