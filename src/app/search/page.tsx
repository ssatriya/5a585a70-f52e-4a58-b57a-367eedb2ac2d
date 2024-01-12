import * as React from "react";

import SearchPost from "@/components/post/search-post";
import PostItem from "@/components/post/post-item";

type SearchPageProps = {
  searchParams?: {
    page: string;
    q: string;
  };
};
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const param = searchParams?.q || "";
  const pageNumber = Number(searchParams?.page || 1);

  return (
    <div className="h-full flex-col items-center justify-center">
      <React.Suspense fallback={<PostItem.Skeleton />}>
        <SearchPost pageNumber={pageNumber} param={param} />
      </React.Suspense>
    </div>
  );
}
