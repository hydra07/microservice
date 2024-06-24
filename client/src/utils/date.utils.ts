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


/**
 * Chuyển đổi chuỗi ngày tháng từ định dạng ISO 8601 sang định dạng "Month Day, Year".
 * @param {string} isoString - Chuỗi ngày tháng theo định dạng ISO 8601.
 * @returns {string} - Chuỗi ngày tháng theo định dạng "Month Day, Year".
 */
export function formatISODateToLongDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}