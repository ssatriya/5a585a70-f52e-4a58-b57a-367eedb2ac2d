import * as React from "react";

import Post from "@/components/post/post";
import PostItem from "@/components/post/post-item";

export type HomeProps = {
  searchParams?: {
    page: string;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const pageNumber = Number(searchParams?.page || 1);
  return (
    <div className="h-full flex-col items-center justify-center">
      <React.Suspense fallback={<PostItem.Skeleton />}>
        <Post pageNumber={pageNumber} />
      </React.Suspense>
    </div>
  );
}
