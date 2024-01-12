import { getUserById } from "@/actions/user";
import { Skeleton } from "@/components/ui/skeleton";

type AuthorProps = {
  id: number;
};

const Author = async ({ id }: AuthorProps) => {
  const { data } = await getUserById(id);

  return (
    <p
      data-test="post-author"
      className="text-muted-foreground text-xs font semibold"
    >
      {data?.username}
    </p>
  );
};
export default Author;

Author.Skeleton = function SkeletonAuthor() {
  return <Skeleton className="h-4 w-16 bg-primary" />;
};
