"use client";

import * as React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PostPaginationProps = {
  page?: number;
  query: string;
  totalPages?: number;
};

const PostPagination = ({
  query,
  page = 1,
  totalPages = 10,
}: PostPaginationProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pages = getPagesToShow();

  return (
    <Pagination className="pb-6">
      <PaginationContent data-test="pagination-list">
        <PaginationPrevious
          data-test={`pagination-previous`}
          href={`${query}${currentPage - 1}`}
          className={cn(currentPage === 1 && "pointer-events-none bg-gray-100")}
        />
        {pages.map((page, index) => (
          <PaginationLink
            data-test={`pagination-${index}`}
            data-current={`pagination-current-${page}`}
            key={index}
            href={`${query}${page}`}
            className={cn(
              "bg-slate-200",
              page === currentPage &&
                "pointer-events-none bg-gray-600 text-white",
              index === 0 && "rounded-l-md",
              index === pages.length && "rounded-r-md"
            )}
          >
            {page}
          </PaginationLink>
        ))}

        <PaginationNext
          data-test={`pagination-next`}
          href={`${query}${currentPage + 1}`}
          className={cn(
            currentPage === 150 && "pointer-events-none bg-gray-100"
          )}
        />
      </PaginationContent>
    </Pagination>
  );
};
export default PostPagination;
