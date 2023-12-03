import { formatDistance, parseISO } from "date-fns";

export function formatDistanceFromNow(date1) {
  return formatDistance(parseISO(date1), new Date(), {
    addSuffix: true,
  })
    .replaceAll("about", "")
    .replaceAll("ago", "Ago");
}

export function formateCurrency(value) {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
