export function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "🌞 Good morning!";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "🌤️ Good afternoon!";
  } else {
    return "🌙 Good evening!";
  }
}
