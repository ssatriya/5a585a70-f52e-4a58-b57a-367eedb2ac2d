import * as React from "react";

import SinglePost from "@/components/post/single-post";
import PostItem from "@/components/post/post-item";

type SinglePageProps = {
  params: {
    id: string;
  };
};

export default function SinglePage({ params }: SinglePageProps) {
  return (
    <React.Suspense fallback={<PostItem.SingleSkeleton />}>
      <SinglePost postId={params.id} />;
    </React.Suspense>
  );
}
