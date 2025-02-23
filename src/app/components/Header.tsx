"use client";
import { Link, Locale, usePathname, useRouter } from "@/i18n/routing";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export default function Header() {
  const t = useTranslations();
  const { setTheme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const handleChangeLanguage = (value: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value }
      );
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full flex-none lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] backdrop-blur bg-white/60 dark:bg-transparent">
      <div className="max-w-7xl mx-auto p-4 md:px-6 lg:px-8 flex items-center">
        <div className="mr-3 flex-none relative">
          <span className="sr-only"></span>
          <Link href="/">Logo</Link>
        </div>
        <div className="hidden xl:block">
          <form className="group relative">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
            <input
              type="text"
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
              aria-label="Tìm kiếm phim"
              placeholder="Tìm kiếm phim..."
            />
          </form>
        </div>
        <div className="hidden xl:flex items-center ml-auto">
          <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/phim-bo"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {t("header.series")}
                </Link>
              </li>
              <li>
                <Link
                  href="/phim-le"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {t("header.movies")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shows"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/cartoons"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {t("header.cartoons")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cartoons"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {t("header.categories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cartoons"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {t("header.national")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cartoons"
                  className="hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {t("header.upcoming")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center border-l border-slate-200 ml-4 pl-4 dark:border-slate-800">
            <Listbox value={locale} onChange={handleChangeLanguage}>
              <div className="relative">
                <ListboxButton className="flex items-center text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400">
                  <span className="block truncate mr-1">
                    {t(`language.${locale}`)}
                  </span>
                  <ChevronUpDownIcon aria-hidden="true" className="w-4 h-4" />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8 transform opacity-100 scale-100"
                >
                  <ListboxOption
                    value="en"
                    className="group flex items-center relative cursor-pointer py-1 px-2 pl-6"
                  >
                    <div className="absolute top-1/2 left-2 -translate-y-1/2 hidden group-data-[selected]:block">
                      <CheckIcon className="size-5" />
                    </div>
                    <span className="ml-3 block truncate">
                      {t("language.en")}
                    </span>
                  </ListboxOption>

                  <ListboxOption
                    value="vi"
                    className="group flex items-center relative cursor-pointer py-1 px-2 pl-6"
                  >
                    <div className="absolute top-1/2 left-2 -translate-y-1/2 hidden group-data-[selected]:block">
                      <CheckIcon className="size-5" />
                    </div>
                    <span className="ml-3 block truncate">
                      {t("language.vi")}
                    </span>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div className="flex items-center ml-4">
            <label className="sr-only">Theme</label>
            <Menu as="div" className="relative flex text-left">
              <MenuButton className="inline-flex justify-center w-full text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                  <SunIcon className="w-6 h-6 mr-2" />
                  {t("header.light")}
                </MenuItem>
                <MenuItem
                  as="li"
                  className="py-1 px-2 flex items-center cursor-pointer text-gray-600 dark:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-600"
                  onClick={() => setTheme("dark")}
                >
                  <MoonIcon className="w-6 h-6 mr-2" />
                  {t("header.dark")}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
