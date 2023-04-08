import { zeroPad } from "./utils";
import { WEEK_DAY } from "./constant";

const DATE_REGEXER = /Y{2,4}|M{1,2}|D{1,2}|d{1,2}|H{1,2}|m{1,2}|s{1,2}/g;

/**
 * @example
 * YY - 22, YYYY - 2022
 * M: 2, MM: 02,
 * D: 2, DD: 02,
 * d: 3, dd: '화',
 * H: 2, HH: 02,
 * m: 2, mm: 02,
 * s: 2, ss: 02,
 */
export function formatDate(
  _date: string | Date = new Date(),
  formatStyle: string = "YYYY년MM월DD일 HH시mm분ss초"
) {
  const date = new Date(_date);

  const year = zeroPad(date.getFullYear(), 4, "0");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const week = date.getDay();

  function matcher(match: string): any {
    return (
      {
        YY: year.slice(-2),
        YYYY: year,
        M: month,
        MM: zeroPad(month, 2, "0"),
        D: day,
        DD: zeroPad(day, 2, "0"),
        d: week,
        dd: WEEK_DAY[week],
        H: hour,
        HH: zeroPad(hour, 2, "0"),
        m: minute,
        mm: zeroPad(minute, 2, "0"),
        s: second,
        ss: zeroPad(second, 2, "0"),
      }[match] || match
    );
  }

  return (
    formatStyle
      .replace(DATE_REGEXER, matcher)
      // "년년" 방지 -> "년"
      .replace(/(년|월|일|시|분|초{1})(년|월|일|시|분|초{1})+/g, "$1")
      .replace(/\s+/g, " ")
  );
}
