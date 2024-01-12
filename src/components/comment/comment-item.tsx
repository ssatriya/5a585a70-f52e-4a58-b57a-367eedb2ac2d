import { CommentContent } from "@/lib/schema/comment";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type CommentItemProps = {
  comment: CommentContent;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <li className="list-none" data-test="comment-list-item">
      <Card className="w-[800px] mb-2">
        <CardHeader>
          <p className="font-semibold text-sm">{comment.user.username}</p>
        </CardHeader>
        <CardContent>{comment.body}</CardContent>
      </Card>
    </li>
  );
};
export default CommentItem;
