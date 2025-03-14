export const getCategories = async <T>(): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/the-loai`);
  const data = await response.json();
  return data.data as T;
};
