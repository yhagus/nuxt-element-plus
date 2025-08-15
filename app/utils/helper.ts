import moment from 'moment/min/moment-with-locales';

export function momentJs(
  date: string | Date | number,
  style?: 'format' | 'relative' | 'calendar',
  format?: string,
) {
  switch (style) {
    case 'format':
      return moment(date).locale('en').format(format);
    case 'relative':
      return moment(date).locale('en').fromNow();
    case 'calendar':
      return moment(date).locale('en').calendar();
    default:
      return moment(date).locale('en');
  }
}

export function URLRouteQuery(query: any, route?: string) {
  const $route = useRoute();
  const $router = useRouter();

  return $router.replace({
    path: route,
    query: {
      ...$route.query,
      ...query,
    },
  });
}

export function formatPercentageRatio(total_value: number, upper_limit: number): string {
  let calculatedPercent = 0;

  // Prevent division by zero error if the upper_limit is 0 or less.
  if (upper_limit > 0) {
    // Calculate the percentage and round it to the nearest whole number.
    calculatedPercent = Math.round((total_value / upper_limit) * 100);
  }

  // Construct the final string.
  return `${calculatedPercent}% / 100%`;
}

export function getCurrentIndex(index: number, limit: number = 10, page: number = 1): number {
  return (page - 1) * limit + index + 1;
}
