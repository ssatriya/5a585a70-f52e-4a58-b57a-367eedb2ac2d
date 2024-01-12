import * as React from "react";

import { getPosts } from "@/actions/post";
import PostItem from "@/components/post/post-item";
import PostPagination from "@/components/post/post-pagination";
import { PAGE_SIZE } from "@/config";

type PostProps = {
  pageNumber: number;
};

export default async function Post({ pageNumber }: PostProps) {
  const limit = PAGE_SIZE;
  const skip = (pageNumber - 1) * limit;

  const { data, error } = await getPosts(skip, limit);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="font-semibold">{error}. Try again later</p>
      </div>
    );
  }

  return (
    <>
      <ul data-test="posts-list">
        {data?.posts &&
          data.posts.map((post) => <PostItem key={post.id} post={post} />)}
      </ul>
      <div className="my-8">
        <PostPagination
          page={pageNumber}
          query="?page="
          totalPages={data?.total}
        />
      </div>
    </>
  );
}
