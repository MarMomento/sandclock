import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);

export default function useDayjs() {
  const format = (date: string, format = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
  };

  const fromNow = (date: string) => {
    const time = dayjs(date);
    const week = dayjs().subtract(7, "days");
    const year = dayjs().subtract(1, "year");
    if (time.isBefore(year)) {
      return time.format("YYYY-MM-DD");
    } else if (time.isBefore(week)) {
      return time.format("MM-DD");
    } else {
      return time.locale("zh-cn").fromNow();
    }
  };

  return {
    format,
    fromNow,
  };
}
