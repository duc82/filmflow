export const getMovies = async (category: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/danh-sach/${category}`
  );
  const data = await response.json();
  return data.data;
};
