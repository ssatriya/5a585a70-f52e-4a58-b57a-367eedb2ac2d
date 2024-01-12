"use client";

import * as React from "react";

import CommentItem from "@/components/comment/comment-item";
import LoginButton from "@/components/auth/login-button";
import CommentBox from "@/components/comment/comment-box";
import { Button } from "@/components/ui/button";
import { CommentContent } from "@/lib/schema/comment";
import { useCurrentUser } from "@/hooks/use-current-user";

type CommentProps = {
  postId: string;
  userId?: string;
  comments?: CommentContent[];
};

const Comment = ({ postId, userId, comments }: CommentProps) => {
  const user = useCurrentUser();

  const [localComments, setLocalComments] = React.useState<
    CommentContent[] | undefined
  >(comments);

  return (
    <>
      <div className="flex items-center w-full">
        {user ? (
          <CommentBox
            postId={postId}
            userId={user.id}
            setLocalComments={setLocalComments}
          />
        ) : (
          <LoginButton mode="modal">
            <Button variant="secondary" size="sm">
              Log in
            </Button>
          </LoginButton>
        )}
      </div>
      <ul className="space-y-2 pb-12" data-test="comments-list">
        {localComments?.map((comment, index) => (
          <CommentItem key={comment.id + index} comment={comment} />
        ))}
      </ul>
    </>
  );
};
export default Comment;
