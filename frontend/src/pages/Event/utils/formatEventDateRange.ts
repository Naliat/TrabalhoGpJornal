export function formatEventDateRange(
  startDate: string,
  endDate: string
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  });

  const yearFormatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
  });

  const startDay = start.getDate();
  const endDay = end.getDate();

  const month = capitalize(monthFormatter.format(start));
  const year = yearFormatter.format(start);

  if (startDay === endDay) {
    return `${startDay} de ${month} de ${year}`;
  }

  return `${startDay} a ${endDay} de ${month} de ${year}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
