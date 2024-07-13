export const getMonthRange = (year: number, month: number): { start: Date; end: Date } => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  endDate.setHours(23, 59, 59, 999);
  return { start: startDate, end: endDate };
};

export const formatMonthName = (month: number): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month % 12];
};
