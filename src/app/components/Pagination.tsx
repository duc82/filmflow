"use client";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useRouter } from "@bprogress/next/app";
import { useMemo } from "react";

const createRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export default function Pagination({
  page: currentPage,
  limit,
  total,
  pageRange = 5,
  siblings = 1,
}: {
  page: number;
  limit: number;
  total: number;
  pageRange?: number;
  siblings?: number;
}) {
  const pageCount = Math.ceil(total / limit);

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblings + pageRange;

    if (totalPageNumbers > pageCount) {
      return createRange(1, pageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, pageCount);

    const isShowLeft = leftSiblingIndex > 2;
    const isShowRight = rightSiblingIndex < pageCount - 2;

    if (isShowLeft && !isShowRight) {
      const rightCount = 3 + 2 * siblings;
      const rightRange = createRange(pageCount - rightCount + 1, pageCount);
      return [1, "LEFT_DOTS", ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftCount = 3 + 2 * siblings;
      const leftRange = createRange(1, leftCount);

      return [...leftRange, "RIGHT_DOTS", pageCount];
    }

    if ((isShowLeft && isShowRight) || (!isShowLeft && !isShowRight)) {
      const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
      return [1, "LEFT_DOTS", ...middleRange, "LEFT_DOTS", pageCount];
    }

    return [];
  }, [siblings, currentPage, pageCount, pageRange]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("page", page.toString());
    const url = `${pathname}?${urlSearchParams.toString()}`;
    router.replace(url);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav className="relative inline-flex rounded-md shadow-sm -space-x-px">
      {currentPage > 1 && (
        <button
          type="button"
          id="prev-button"
          onClick={() => handleChange(currentPage - 1)}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white dark:bg-slate-700/10 border-gray-300 text-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 text-sm font-medium"
        >
          <ArrowLongLeftIcon className="size-5" />
        </button>
      )}

      {paginationRange.map((page, i) => {
        if (page === "LEFT_DOTS") {
          return (
            <button
              type="button"
              id="left-dots"
              key={i}
              onClick={() => handleChange(currentPage - pageRange)}
              className="group bg-white dark:bg-slate-700/10 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-gray-900 inline-flex justify-center items-center px-2 py-2 min-w-10 border text-sm font-medium"
            >
              <span className="group-hover:hidden">...</span>
              <ChevronDoubleLeftIcon className="size-3 hidden group-hover:block" />
            </button>
          );
        }

        if (page === "RIGHT_DOTS") {
          return (
            <button
              type="button"
              id="right-dots"
              key={i}
              onClick={() => handleChange(currentPage + pageRange)}
              className="group bg-white dark:bg-slate-700/10 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-gray-900 inline-flex justify-center items-center px-2 py-2 min-w-10 border text-sm font-medium"
            >
              <span className="group-hover:hidden">...</span>
              <ChevronDoubleRightIcon className="size-3 hidden group-hover:block" />
            </button>
          );
        }

        return (
          <button
            type="button"
            key={i}
            onClick={() => handleChange(page as number)}
            className={clsx(
              currentPage === page
                ? "z-10 bg-indigo-50 dark:bg-slate-700/10 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                : "bg-white dark:bg-slate-700/10 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-gray-900 relative inline-flex justify-center items-center px-4 py-2 min-w-10 border text-sm font-medium"
            )}
          >
            {page}
          </button>
        );
      })}

      {currentPage < pageCount && (
        <button
          type="button"
          id="next-button"
          onClick={() => handleChange(currentPage + 1)}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white dark:bg-slate-700/10 border-gray-300 text-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 text-sm font-medium"
        >
          <ArrowLongRightIcon className="size-5" />
        </button>
      )}
    </nav>
  );
}
