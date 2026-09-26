export function parseDurationToSeconds(input: string): number {
  const lower = input.toLowerCase();
  if (lower.endsWith("sec")) {
    return parseInt(lower) || 0;
  } else if (lower.endsWith("min")) {
    return (parseInt(lower) || 0) * 60;
  } else if (lower.endsWith("h") || lower.endsWith("hr")) {
    return (parseInt(lower) || 0) * 60 * 60;
  }
  return 0;
}

export function startCountdown(
  durationInSeconds: number,
  onTick: (remaining: number) => void,
  onEnd: () => void,
) {
  let remaining = durationInSeconds;

  const interval = setInterval(() => {
    remaining--;
    onTick(remaining);

    if (remaining <= 0) {
      clearInterval(interval);
      onEnd();
    }
  }, 1000);
}

export function hasTimerExpired(startSeconds: number, endSeconds: number): boolean {
  const createdAt = startSeconds;
  const durationInMs = endSeconds * 1000;
  const now = Date.now();
  return now >= createdAt + durationInMs;
}
