export const getNationals = async <T>(): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/quoc-gia`);
  const data = await response.json();
  return data.data as T;
};
