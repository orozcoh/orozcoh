import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('aguacate')
export class AguacateController {
  private posts = [];

  @Get()
  getAllPosts() {
    return this.posts;
  }

  @Post()
  createPost(@Body() body) {
    const { title, content } = body;
    const post = { title, content };
    this.posts.push(post);
    return post;
  }
}

