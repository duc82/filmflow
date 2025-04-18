"use client";
import useRootContext from "@/app/hooks/useRootContext";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
import { usePathname, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import queryString from "query-string";
import { useRouter } from "@bprogress/next/app";
import clsx from "clsx";

const sortFields = [
  { value: "_id", label: "Thời gian đăng" },
  { value: "modified.time", label: "Thời gian cập nhật" },
  { value: "year", label: "Năm sản xuất" },
];

const types = [
  { value: "phim-moi", label: "Phim Mới" },
  { value: "phim-bo", label: "Phim Bộ" },
  { value: "phim-le", label: "Phim Lẻ" },
  { value: "tv-shows", label: "TV Shows" },
  { value: "phim-hoat-hinh", label: "Hoạt Hình" },
  {
    value: "phim-vietsub",
    label: "Phim Vietsub",
  },
  {
    value: "phim-thuyet-minh",
    label: "Phim Thuyết Minh",
  },
  {
    value: "phim-long-tieng",
    label: "Phim Lồng Tiếng",
  },
  {
    value: "phim-bo-dang-chieu",
    label: "Phim Bộ Đang Chiếu",
  },
  { value: "phim-tron-bo", label: "Phim Trọn Bộ" },
  { value: "phim-sap-chieu", label: "Phim Sắp Chiếu" },
];

const nextYear = new Date().getFullYear() + 1;
const oldestYear = 1950;

const years = Array.from(
  { length: nextYear - oldestYear + 1 },
  (_, i) => nextYear - i
);

interface FilterProps {
  defaultSortField?: string;
  defaultType?: string;
  defaultCategory?: string;
  defaultCountry?: string;
  type: "type" | "category" | "country" | "search";
}

export default function Filter({
  defaultSortField = "modified.time",
  defaultType,
  defaultCategory,
  defaultCountry,
  type,
}: FilterProps) {
  const { nationals, categories } = useRootContext();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const obj = Object.fromEntries(formData.entries());
    const slug = obj[type];

    if (type !== "search") {
      delete obj[type];
    }
    const obj2 = Object.fromEntries(searchParams.entries());

    const newObj = {
      ...obj,
      ...obj2,
    };

    const query = queryString.stringify(newObj, {
      skipEmptyString: true,
    });

    if (type === "search") {
      router.replace(`${pathname}?${query}`);
      return;
    }

    const pathnameArr = pathname.split("/");
    router.push(`/${pathnameArr[1]}/${slug}?${query}`);
  };

  return (
    <div className="w-full px-2 py-1 bg-gray-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-white">
      <form onSubmit={handleFilter} className="lg:flex gap-2 items-center">
        <div className="p-2 flex justify-between">
          <span>Lọc Phim</span>
          <div className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <ChevronDoubleDownIcon className="size-6" />
          </div>
        </div>
        <div
          className={clsx("lg:flex gap-2 items-center", !isOpen && "hidden")}
        >
          <div className="p-2">
            <select
              name="sort_field"
              id="filter-sort"
              defaultValue={defaultSortField}
              className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-white p-2 rounded-md outline-none"
            >
              {sortFields.map((field) => (
                <option key={field.value} value={field.value} className="py-2">
                  {field.label}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <select
              name="type"
              id="filter-eptype"
              defaultValue={defaultType}
              className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-white p-2 rounded-md outline-none"
            >
              {types.map((type) => (
                <option key={type.value} className="py-2" value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <select
              name="category"
              id="filter-category"
              defaultValue={defaultCategory}
              className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-white p-2 rounded-md outline-none"
            >
              <option value="" className="py-2">
                Toàn bộ Thể Loại
              </option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  className="py-2"
                  value={category.slug}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <select
              name="country"
              id="filter-country"
              defaultValue={defaultCountry}
              className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-white p-2 rounded-md outline-none"
            >
              <option value="" className="py-2">
                Toàn bộ Quốc Gia
              </option>
              {nationals.map((national) => (
                <option
                  key={national._id}
                  className="py-2"
                  value={national.slug}
                >
                  {national.name}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <select
              name="year"
              id="filter-year"
              className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-white p-2 rounded-md outline-none"
            >
              <option value="" className="py-2">
                Toàn bộ Năm
              </option>
              {years.map((year, i) => (
                <option key={i} className="py-2" value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <button
              type="submit"
              id="btn-movie-filter"
              className="bg-violet-500 text-white p-1.5 rounded hover:bg-violet-400"
            >
              <span>Duyệt Phim</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
