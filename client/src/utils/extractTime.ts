export function extractTime(datestring: string) {
  const date = new Date(datestring);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}
