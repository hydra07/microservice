import { useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

export default function PagePagination({
  page,
  totalPage,
  href,
}: {
  page: number;
  totalPage: number;
  href: string;
}) {
  console.log(page);
  const currentPage = typeof page === 'string' ? parseInt(page) : page;
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPage, currentPage + 1);
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === currentPage} href={`${link(i)}`}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };
  const link = useCallback(
    (page: number) => {
      console.log(href);
      return `${href}${href.includes('?') ? `&page=${page}` : `?page=${page}`}`;
    },
    [href],
  );
  console.log(totalPage, currentPage, previousPage, nextPage);
  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          {currentPage !== previousPage && (
            <PaginationItem>
              <PaginationPrevious href={`${link(previousPage)}`} />
            </PaginationItem>
          )}
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink href={`${link(1)}`}>1</PaginationLink>
              </PaginationItem>
              {currentPage > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}
          {renderPaginationItems()}
          {currentPage < totalPage - 2 && (
            <>
              {currentPage < totalPage - 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={`${link(totalPage)}`}>
                  {totalPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          {currentPage !== nextPage && (
            <PaginationItem>
              <PaginationNext href={`${link(nextPage)}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
