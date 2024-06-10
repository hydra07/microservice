import { formatDistanceToNow, parseISO } from 'date-fns';

export function formatDistanceDate(date: string) {
  return formatDistanceToNow(parseISO(date));
}

/**
 *
 * @param date:string
 * format date to dd/mm/yyyy
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
