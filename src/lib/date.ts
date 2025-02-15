export const convertSecondsToDaysText = (seconds: string) => {
  const totalDays = Math.round(parseInt(seconds, 10) / 86400);
  return `${totalDays > 1 ? `${totalDays} days` : '24 hours'}`;
};
