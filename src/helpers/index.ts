import { Genre } from '@/types';

export function dateFormatter(date: Date): string {
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  const year: string | number = date.getFullYear();

  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${year}-${month}-${day}`;
}

export function prettifyGenres(totalGenres: Genre[], genreIds: number[]) {
  return genreIds
    .filter((id: number) => totalGenres.find((genre: Genre) => genre.id === id && genre.name !== undefined))
    .map((id: number) => totalGenres.find((genre: Genre) => genre.id === id)?.name);
}
