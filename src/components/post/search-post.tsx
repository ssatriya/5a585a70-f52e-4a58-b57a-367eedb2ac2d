import { getPostByParams } from "@/actions/post";
import PostItem from "@/components/post/post-item";
import FormNotice from "@/components/form-notice";
import { PAGE_SIZE } from "@/config";
import PostPagination from "@/components/post/post-pagination";

type SearchPostProps = {
  pageNumber: number;
  param: string;
};

export default async function SearchPost({
  pageNumber,
  param,
}: SearchPostProps) {
  const limit = PAGE_SIZE;
  const skip = (pageNumber - 1) * limit;

  const { data, error } = await getPostByParams(param, skip, limit);

  if (param === "") {
    return <FormNotice message="Query parameter not found" />;
  }

  if (data && data.total === 0) {
    return <FormNotice message="No posts found..." />;
  }

  return (
    <>
      <ul data-test="posts-list">
        {data?.posts &&
          data.posts.map((post) => <PostItem key={post.id} post={post} />)}
        {data && data?.total > PAGE_SIZE && (
          <div className="my-8">
            <PostPagination
              page={pageNumber}
              query={`?q=${param}&page=`}
              totalPages={data.total}
            />
          </div>
        )}
      </ul>
    </>
  );
}
