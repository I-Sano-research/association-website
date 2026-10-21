const japanDateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
});

function dateParts(date: Date) {
  const parts = Object.fromEntries(
    japanDateFormatter.formatToParts(date).map(part => [part.type, part.value]),
  );
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    weekday: parts.weekday,
  };
}

function dateKey(date: Date): string {
  const { year, month, day } = dateParts(date);
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function formatEventDate(date: Date, endDate?: Date): string {
  const start = dateParts(date);
  const startLabel = `${start.year}年${start.month}月${start.day}日（${start.weekday}）`;
  if (!endDate || dateKey(date) === dateKey(endDate)) return startLabel;

  const end = dateParts(endDate);
  const endYear = start.year === end.year ? '' : `${end.year}年`;
  return `${startLabel}〜${endYear}${end.month}月${end.day}日（${end.weekday}）`;
}

export function formatTimelineDate(date: Date, endDate?: Date): string {
  const startLabel = dateKey(date).replaceAll('-', '.');
  if (!endDate || dateKey(date) === dateKey(endDate)) return startLabel;
  return `${startLabel}〜${dateKey(endDate).replaceAll('-', '.')}`;
}

export function resolveEventStatus(
  status: 'upcoming' | 'finished',
  date: Date,
  endDate?: Date,
  now: Date = new Date(),
): 'upcoming' | 'finished' {
  // 日本時間の最終開催日が終わるまで、複数日開催も予定欄に残す。
  return status === 'upcoming' && dateKey(endDate ?? date) < dateKey(now)
    ? 'finished'
    : status;
}
