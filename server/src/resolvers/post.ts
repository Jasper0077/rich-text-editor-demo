import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post)
  async post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | undefined>{
    return await em.findOne(Post, {where: {id: id}})
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("content", () => String) content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = em.create(Post, {
      content
    })

    await em.save(post)
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async editPost(
    @Arg("id", () => Int) id: number,
    @Arg("content", () => String) content: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, {
      where: {
        id: id
      }
    })
    if (post) {
      post.content = content;
      await em.save(post);
      return post
    }
    return null;
  }
}