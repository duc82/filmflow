import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="mt-2 bg-gray-200 dark:bg-slate-800 shadow overflow-hidden sm:rounded-lg pb-8">
        <div className="text-center pt-8">
          <h1 className="text-9xl font-bold text-purple-400">404</h1>
          <h1 className="text-6xl font-medium py-8">
            Không tìm thấy trang này
          </h1>
          <p className="text-2xl pb-8 px-12 font-medium">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã
            <br />
            bị xóa. Vui lòng kiểm tra lại hoặc quay về trang chủ.
          </p>
          <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
            <Link title="Trang chủ" href="/">
              Trang Chủ
            </Link>
          </button>
          <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
            <Link href="">Liên Hệ</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
