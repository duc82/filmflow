import clsx from "clsx";
import Link from "next/link";

function Breadcrumb({ children }: { children: React.ReactNode }) {
  return (
    <ol className="ml-4 flex text-sm leading-6 overflow-hidden overflow-ellipsis whitespace-nowrap min-w-0">
      {children}
    </ol>
  );
}

function BreadcrumbItem({
  href = "",
  active = false,
  children,
}: {
  active?: boolean;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center">
      <Link
        href={href}
        className={clsx(
          active
            ? "text-slate-900 dark:text-slate-200 font-semibold"
            : "text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-slate-300"
        )}
      >
        {children}
      </Link>
      {!active && (
        <svg
          width="3"
          height="6"
          aria-hidden="true"
          className="mx-3 overflow-visible text-slate-400"
        >
          <path
            d="M0 0L3 3L0 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
      )}
    </li>
  );
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
