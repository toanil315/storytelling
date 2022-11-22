export const TimeUnits = {
  year: 31536000000,
  month: 2592000000,
  week: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
};

const DateTimeUtils = {
  convertToTimeAgo: (milliseconds: number): string => {
    let result = "";
    const millisecondAgo = Date.now() - milliseconds;
    for (let key in TimeUnits) {
      const integerPart = Math.floor(
        millisecondAgo / TimeUnits[key as keyof typeof TimeUnits]
      );
      if (integerPart > 0) {
        result = `${integerPart} ${key}${integerPart > 1 ? "s" : ""} ago`;
        break;
      }
    }
    return Boolean(result.trim()) ? result : "now";
  },
};

export default DateTimeUtils;
