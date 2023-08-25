export function isSameDate(
  date1: Date | string,
  date2: Date | string
): boolean {
  date1 = typeof date1 === 'string' ? new Date(date1) : date1

  date2 = typeof date2 === 'string' ? new Date(date2) : date2

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
