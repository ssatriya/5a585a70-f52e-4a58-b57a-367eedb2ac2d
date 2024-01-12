import * as React from "react";

import { getPostById } from "@/actions/post";
import Author from "@/components/post/author";
import Comment from "@/components/comment/comment";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { getCommentByPostId } from "@/actions/comment";
import { FormError } from "@/components/form-error";
import FormNotice from "@/components/form-notice";

type SinglePostProps = {
  postId: string;
};

export default async function SinglePost({ postId }: SinglePostProps) {
  const user = await currentUser();
  const { data } = await getPostById(postId);
  const { data: comments } = await getCommentByPostId(postId);

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-2 h-full">
      <Card className="w-[800px] mb-2" data-test="single-post">
        <CardHeader>
          <p data-test="post-title" className="font-bold">
            {data?.title}
          </p>
          <Author id={data?.userId} />
        </CardHeader>
        <CardContent>{data?.body}</CardContent>
      </Card>

      {comments ? (
        <Comment
          postId={postId}
          userId={user?.id}
          comments={comments?.comments}
        />
      ) : (
        <FormError message="Failed to fetch comments" />
      )}
      {comments?.comments && comments.comments.length === 0 && (
        <FormNotice message="Not comments yet..." />
      )}
    </div>
  );
}
