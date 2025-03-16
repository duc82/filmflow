import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-sm leading-6 mt-10 p-2 xl:p-0">
      <section>
        <div className="pt-2 pb-20 text-slate-700 dark:text-slate-400 border-t border-slate-200 dark:border-slate-200/5">
          <p className="block">
            Tất cả nội dung của trang web này được thu thập từ các trang web
            video chính thống trên Internet, và không cung cấp phát trực tuyến
            chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng thông báo cho
            chúng tôi, chúng tôi sẽ xóa nội dung vi phạm kịp thời, cảm ơn sự hợp
            tác của bạn!
          </p>
          <div className="sm:flex justify-between pt-2">
            <div className="mb-6 sm:mb-0 sm:flex">
              <p>Copyright © {new Date().getFullYear()} FilmFlow</p>
              <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200 dark:sm:border-slate-200/5">
                <Link
                  className="hover:text-slate-900 dark:hover:text-slate-300"
                  href="/gioi-thieu"
                >
                  Giới Thiệu
                </Link>
              </p>
              <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200 dark:sm:border-slate-200/5">
                <Link
                  className="hover:text-slate-900 dark:hover:text-slate-300"
                  href="/khieu-nai-ban-quyen"
                >
                  Khiếu nại bản quyền
                </Link>
              </p>
              <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200 dark:sm:border-slate-200/5">
                <Link
                  className="hover:text-slate-900 dark:hover:text-slate-300"
                  title="Dành cho nhà phát triển"
                  href="/api-document"
                >
                  API
                </Link>
              </p>
            </div>
            <div className="flex space-x-6 text-slate-400 dark:text-slate-500"></div>
          </div>
        </div>
      </section>
    </footer>
  );
}
