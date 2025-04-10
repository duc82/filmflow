"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { cn } from "../utils/cn";
import logo from "../assets/logo.png";
import Image from "next/image";
import { useRouter } from "@bprogress/next/app";
import useRootContext from "../hooks/useRootContext";

export default function Header() {
  const { categories, nationals, setIsSearchFocus } = useRootContext();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handleSearchMovie = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    router.push(`/tim-kiem?keyword=${search}`);
    setIsOpenSearch(false);
    e.currentTarget.reset();
  };

  const handleCloseNavbar = () => {
    document.body.style.overflow = "auto";
    setIsOpenNavbar(false);
  };

  const handleOpenNavbar = () => {
    document.body.style.overflow = "hidden";
    setIsOpenNavbar(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full flex-none lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] backdrop-blur bg-white/60 dark:bg-transparent">
        <div className="max-w-7xl mx-auto p-4 md:px-6 lg:px-8 flex items-center border-b border-slate-900/10 lg:border-none dark:border-slate-300/10">
          <div className="mr-4 flex-none relative">
            <span className="sr-only"></span>
            <Link href="/">
              <Image src={logo} width={150} alt="Logo" />
            </Link>
          </div>
          <div className="hidden xl:block">
            <form className="group relative" onSubmit={handleSearchMovie}>
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 w-5 h-5" />
              <input
                type="text"
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
                aria-label="Tìm kiếm phim"
                placeholder="Tìm kiếm phim..."
                name="search"
                autoComplete="off"
                onFocus={() => setIsSearchFocus(true)}
                onBlur={() => setIsSearchFocus(false)}
              />
            </form>
          </div>
          <div className="hidden xl:flex items-center ml-auto">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href="/danh-sach/phim-bo"
                    className="hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    Phim Bộ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/danh-sach/phim-le"
                    className="hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    Phim Lẻ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/danh-sach/tv-shows"
                    className="hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    Shows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/danh-sach/hoat-hinh"
                    className="hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    Hoạt Hình
                  </Link>
                </li>
                <li>
                  <Menu as="div" className="relative">
                    <MenuButton
                      as="button"
                      aria-label="Thể Loại"
                      className="cursor-pointer flex items-center hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      Thể Loại
                      <ChevronDownIcon className="w-5 h-5 ml-1.5 text-violet-400 hover:text-violet-800" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 w-[450px] mt-8 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none transform opacity-100 scale-100">
                      <div className="px-1 py-1 grid grid-flow-rows grid-cols-3 justify-items-center">
                        {categories.map((category) => (
                          <MenuItem key={category.slug}>
                            <Link
                              className="px-4 py-2 text-gray-900 dark:text-white group flex rounded-md text-sm hover:bg-violet-500 hover:text-white"
                              href={`/the-loai/${category.slug}`}
                            >
                              {category.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>
                </li>
                <li>
                  <Menu as="div" className="relative">
                    <MenuButton
                      as="button"
                      aria-label="Quốc Gia"
                      className="cursor-pointer flex items-center hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      Quốc Gia
                      <ChevronDownIcon className="w-5 h-5 ml-1.5 text-violet-400 hover:text-violet-800" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 w-[450px] mt-8 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none transform opacity-100 scale-100">
                      <div className="px-1 py-1 grid grid-flow-rows grid-cols-3 justify-items-center">
                        {nationals.map((national) => (
                          <MenuItem key={national.slug}>
                            <Link
                              className="px-4 py-2 text-gray-900 dark:text-white group flex rounded-md text-sm hover:bg-violet-500 hover:text-white"
                              href={`/quoc-gia/${national.slug}`}
                            >
                              {national.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>
                </li>
                <li>
                  <Link
                    href="/danh-sach/phim-sap-chieu"
                    className="hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    Sắp Chiếu
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center ml-4">
              <label className="sr-only">Theme</label>
              <Menu as="div" className="relative flex text-left">
                <MenuButton className="inline-flex justify-center cursor-pointer w-full text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <SunIcon className="block dark:hidden w-6 h-6" />
                  <MoonIcon className="hidden dark:block w-6 h-6" />
                </MenuButton>

                <MenuItems
                  as="ul"
                  transition
                  className="absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8 transform opacity-100 scale-100"
                >
                  <MenuItem
                    as="li"
                    className="py-1 px-2 flex items-center cursor-pointer text-sky-500 dark:text-gray-50 hover:bg-slate-50 dark:hover:bg-slate-600"
                    onClick={() => setTheme("light")}
                  >
                    <SunIcon className="size-6 mr-2" />
                    Sáng
                  </MenuItem>
                  <MenuItem
                    as="li"
                    className="py-1 px-2 flex items-center cursor-pointer text-gray-600 dark:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-600"
                    onClick={() => setTheme("dark")}
                  >
                    <MoonIcon className="size-6 mr-2" />
                    Tối
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <button
            type="button"
            className="ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 xl:hidden dark:text-slate-400 dark:hover:text-slate-300"
            onClick={() => setIsOpenSearch((prev) => !prev)}
            aria-label="Tìm kiếm phim"
          >
            {isOpenSearch ? (
              <XMarkIcon className="size-6" />
            ) : (
              <MagnifyingGlassIcon className="size-6" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme((theme) => (theme === "dark" ? "light" : "dark"));
            }}
            aria-label="Chuyển đổi chủ đề"
            className="ml-2 text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 xl:hidden dark:text-slate-400 dark:hover:text-slate-300"
          >
            <SunIcon className="block dark:hidden size-6" />
            <MoonIcon className="hidden dark:block size-6" />
          </button>

          <div className="ml-2 -my-1 xl:hidden">
            <button
              onClick={handleOpenNavbar}
              aria-label="Menu"
              className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "px-2 relative pointer-events-auto hidden",
          isOpenSearch && "block"
        )}
      >
        <div className="relative block xl:hidden">
          <form
            id="mobileSearch"
            className="group relative transition ease-out duration-1000"
            onSubmit={handleSearchMovie}
          >
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 size-5" />
            <input
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 dark:text-slate-100 placeholder-slate-400 py-2 pl-10 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
              type="text"
              aria-label="Tìm kiếm phim"
              placeholder="Tìm kiếm phim..."
              name="search"
              autoComplete="off"
            />
          </form>
        </div>
      </div>

      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 invisible transition-all duration-300",
          isOpenNavbar && "visible"
        )}
      >
        <div
          onClick={handleCloseNavbar}
          className={cn(
            "fixed inset-0 bg-black/50 opacity-0 transition-opacity duration-300",
            isOpenNavbar && "opacity-100"
          )}
        ></div>

        <nav
          className={cn(
            "relative bg-white shadow-lg h-full w-72 px-4 py-8 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5 translate-x-full transition-transform duration-300",
            isOpenNavbar && "translate-x-0"
          )}
        >
          <button
            type="button"
            className="absolute top-2.5 right-2.5"
            onClick={handleCloseNavbar}
          >
            <XMarkIcon className="size-6" />
          </button>
          <ul className="space-y-4">
            <li>
              <Link
                href="/danh-sach/phim-bo"
                onClick={handleCloseNavbar}
                className="block hover:text-sky-500 dark:hover:text-sky-400"
              >
                Phim Bộ
              </Link>
            </li>
            <li>
              <Link
                href="/danh-sach/phim-le"
                onClick={handleCloseNavbar}
                className="block hover:text-sky-500 dark:hover:text-sky-400"
              >
                Phim Lẻ
              </Link>
            </li>
            <li>
              <Link
                href="/danh-sach/tv-shows"
                onClick={handleCloseNavbar}
                className="block hover:text-sky-500 dark:hover:text-sky-400"
              >
                Shows
              </Link>
            </li>
            <li>
              <Link
                href="/danh-sach/hoat-hinh"
                onClick={handleCloseNavbar}
                className="block hover:text-sky-500 dark:hover:text-sky-400"
              >
                Hoạt Hình
              </Link>
            </li>
            <li>
              <Disclosure>
                <DisclosureButton className="group flex items-center justify-between w-full hover:text-sky-500 dark:hover:text-sky-400">
                  Thể Loại
                  <ChevronDownIcon className="size-5 ml-1.5 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="flex flex-col pl-2 space-y-2 mt-2 max-h-56 overflow-y-auto">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      onClick={handleCloseNavbar}
                      href={`/the-loai/${category.slug}`}
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      {category.name}
                    </Link>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            </li>
            <li>
              <Disclosure>
                <DisclosureButton className="group flex items-center justify-between w-full hover:text-sky-500 dark:hover:text-sky-400">
                  Quốc Gia
                  <ChevronDownIcon className="size-5 ml-1.5 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="flex flex-col pl-2 space-y-2 mt-2 max-h-56 overflow-y-auto">
                  {nationals.map((national) => (
                    <Link
                      key={national.slug}
                      onClick={handleCloseNavbar}
                      href={`/quoc-gia/${national.slug}`}
                      className="hover:text-sky-500 dark:hover:text-sky-400"
                    >
                      {national.name}
                    </Link>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            </li>
            <li>
              <Link
                href="/danh-sach/phim-sap-chieu"
                onClick={handleCloseNavbar}
                className="block hover:text-sky-500 dark:hover:text-sky-400"
              >
                Sắp Chiếu
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
