export const getIMDB = async <T>(id: string): Promise<T> => {
  const response = await fetch(`https://imdbdev.xyz/api/imdb/${id}`);
  const data = await response.json();
  return data;
};
