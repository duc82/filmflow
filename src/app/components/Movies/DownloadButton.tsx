"use client";
export default function DownloadButton() {
  return (
    <button
      type="button"
      onClick={() => {
        alert("Tính năng đang được cập nhật");
      }}
      className="cursor-pointer hover:bg-opacity-80 bg-green-500 text-gray-50 dark:text-gray-50 inline-block px-1 py-1 rounded"
    >
      Tải Phim
    </button>
  );
}
