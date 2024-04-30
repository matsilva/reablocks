import {
  addDays,
  format,
  getDay,
  getDaysInMonth,
  getDate,
  getISODay,
  isAfter,
  isBefore,
  isValid,
  isSameDay,
  isSameMonth,
  startOfMonth,
  min,
  max,
  subDays
} from 'date-fns';

/**
 * Get the month names for a given locale and format.
 *
 * Reference: https://www.abeautifulsite.net/posts/getting-localized-month-and-day-names-in-the-browser/
 */
export function getMonthNames(
  locale?: string,
  format: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow' = 'short'
) {
  const formatter = new Intl.DateTimeFormat(locale ?? navigator?.language, {
    month: format,
    timeZone: 'UTC'
  });

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
    const mm = month < 10 ? `0${month}` : month;
    return new Date(`2017-${mm}-01T00:00:00+00:00`);
  });

  return months.map(date => formatter.format(date));
}

export const monthNames = getMonthNames();

export function getDayLabels(locale?: string) {
  return Array.from(
    { length: 7 },
    (_, i) =>
      new Intl.DateTimeFormat(locale ?? navigator?.language, {
        weekday: 'short'
      }).format(new Date(1970, 0, 4 + i)) // 1970/01/04 is a Sunday
  );
}

export const daysOfWeek = getDayLabels();

export interface Day {
  date: Date;
  dayOfMonth: number;
  isWeekendDay: boolean;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
  isToday: boolean;
  formattedDate: string;
}

export interface DayOptions {
  format: string;
}

export function getWeeks(
  date: Date,
  options: DayOptions = { format: 'MM/dd/yyyy' }
): Day[][] {
  if (!date) {
    throw new Error('A date is required');
  } else if (!isValid(date)) {
    console.warn('Invalid date - setting to today', date);
    date = new Date();
  }

  const daysInMonth = getDaysInMonth(date);
  let day = startOfMonth(date);
  let offset = getDay(day);
  const numOfWeeks = Math.ceil((daysInMonth + offset) / 7);

  // @ts-ignore
  const weeks: Day[][] = Array.apply(null, {
    length: numOfWeeks
  }).map(() => []);

  const current = new Date();

  const [firstWeek] = weeks;
  for (let i = offset; i > 0; i--) {
    const offsetDay = subDays(day, i);
    firstWeek.push({
      date: offsetDay,
      dayOfMonth: getDate(offsetDay),
      isWeekendDay: getISODay(offsetDay) > 5,
      isPreviousMonth: true,
      isNextMonth: false,
      isToday: false,
      formattedDate: format(offsetDay, options.format)
    });
  }

  for (let i = 0, week = weeks[i]; i < numOfWeeks; i++, week = weeks[i]) {
    for (let dayOfWeek = offset; dayOfWeek < 7; dayOfWeek++) {
      week.push({
        date: day,
        dayOfMonth: getDate(day),
        isPreviousMonth: false,
        isToday: isSameDay(day, current),
        isNextMonth: !isSameMonth(day, date),
        isWeekendDay: getISODay(day) > 5,
        formattedDate: format(day, options.format)
      });
      day = addDays(day, 1);
    }
    offset = 0;
  }

  return weeks;
}

/**
 * Get attributes for the day:
 * - isActive: if the day is within the selected range
 * - isRangeStart: if the day is the start of the range
 * - isRangeEnd: if the day is the end of the range
 *
 * "Range" here refers to a selection OR a selected date to hovered date.
 */
export function getDayAttributes(
  day: Date,
  current:
    | Date
    | [Date, Date]
    | [Date, undefined]
    | [undefined, undefined]
    | undefined,
  hover: Date,
  isRange: boolean
) {
  let isActive = false;
  let isRangeStart = false;
  let isRangeEnd = false;

  const isInRange = (date: Date, range: [Date, Date]) => {
    const startDate = min(range);
    const endDate = max(range);

    return (
      isAfter(date, addDays(startDate, -1)) &&
      isBefore(date, addDays(endDate, 1))
    );
  };

  const isSelectionStarted = Array.isArray(current) && isValid(current[0]);
  const isSelectionComplete = isSelectionStarted && isValid(current[1]);

  if (!isRange && isValid(current)) {
    // if not a range
    isActive = isSameDay(day, current as Date);
  } else if (!isSelectionStarted) {
    // if selection has not started
    isActive = isSameDay(day, hover);
    isRangeStart = isActive;
    isRangeEnd = isActive;
  } else if (isSelectionComplete) {
    // if a range has been selected
    isActive = isInRange(day, current);
    isRangeStart = isSameDay(day, current[0]);
    isRangeEnd = isSameDay(day, current[1]);
  } else {
    // if in the process of selecting a range
    const activeRange: [Date, Date] = [current[0], hover ?? current[0]];
    isActive = isInRange(day, activeRange);
    isRangeStart = isSameDay(day, min(activeRange));
    isRangeEnd = isSameDay(day, max(activeRange));
  }

  return { isActive, isRangeStart, isRangeEnd };
}

/**
 * Get whether the space below the current day is empty or not
 */
export function isNextWeekEmpty(
  day: Date,
  range: [Date, Date],
  hideNextMonth: boolean
) {
  const nextWeek = addDays(day, 7);
  const nextWeekInRange =
    isBefore(nextWeek, max(range)) || isSameDay(nextWeek, max(range));

  return !(nextWeekInRange && (isSameMonth(day, nextWeek) || !hideNextMonth));
}

/**
 * Get whether the space above the current day is empty or not
 */
export function isPreviousWeekEmpty(
  day: Date,
  range: [Date, Date],
  hidePrevMonth: boolean
) {
  const prevWeek = addDays(day, -7);
  const prevWeekInRange =
    isAfter(prevWeek, min(range)) || isSameDay(prevWeek, min(range));

  return !(prevWeekInRange && (isSameMonth(day, prevWeek) || !hidePrevMonth));
}
