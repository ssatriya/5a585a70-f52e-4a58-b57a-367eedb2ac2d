import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ArticleType } from "@/lib/schema/article";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Author from "@/components/post/author";
import { Skeleton } from "@/components/ui/skeleton";

type PostItemProps = {
  post: ArticleType;
};

const PostItem = ({ post }: PostItemProps) => {
  if (!post) {
    return notFound();
  }

  return (
    <li data-test="post-list-item" className="list-none">
      <Card className="w-[800px] mb-2">
        <CardHeader>
          <>
            <Link href={`/${post.id}`} className="w-fit">
              <p className="font-bold cursor-pointer hover:underline">
                {post.title}
              </p>
            </Link>
            <React.Suspense fallback={<Author.Skeleton />}>
              <Author id={post.userId} />
            </React.Suspense>
          </>
        </CardHeader>
        <CardContent>{post.body}</CardContent>
      </Card>
    </li>
  );
};
export default PostItem;

PostItem.Skeleton = function SkeletonPostItem() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-44 w-[800px] bg-primary" />
      <Skeleton className="h-44 w-[800px] bg-primary" />
      <Skeleton className="h-44 w-[800px] bg-primary" />
      <Skeleton className="h-44 w-[800px] bg-primary" />
      <Skeleton className="h-44 w-[800px] bg-primary" />
    </div>
  );
};

PostItem.SingleSkeleton = function SkeletonSinglePostItem() {
  return <Skeleton className="h-52 w-[800px] bg-primary" />;
};
