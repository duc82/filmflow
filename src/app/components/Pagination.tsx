"use client";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function Pagination({
  page,
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
  const totalPages = Math.ceil(total / limit);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const href = (page: number) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("page", page.toString());
    return `${pathname}?${urlSearchParams.toString()}`;
  };

  const start = Math.max(0, page - siblings);
  const end = Math.min(totalPages, start + pageRange);

  if (page <= limit) {
    return null;
  }

  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      {page > 1 && (
        <Link
          href={href(page - 1)}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white dark:bg-slate-700/10 dark:bg-gray-800 border-gray-300 text-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 text-sm font-medium"
        >
          <ArrowLongLeftIcon className="size-5" />
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(start, end)
        .map((item) => (
          <Link
            key={item}
            href={href(item)}
            className={clsx(
              page === item
                ? "z-10 bg-indigo-50 dark:bg-slate-700/10 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                : "bg-white dark:bg-slate-700/10 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-gray-900 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            )}
          >
            {item}
          </Link>
        ))}

      {page < totalPages && (
        <Link
          href={href(page + 1)}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white dark:bg-slate-700/10 border-gray-300 text-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 text-sm font-medium"
        >
          <ArrowLongRightIcon className="size-5" />
        </Link>
      )}
    </nav>
  );
}
