export const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(" ");
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, "");
  return initials;
};

/**
 * Converts a snake_case string into sentence case.
 */
export const snakeToSentence = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const normalized = trimmed
    .replace(/_+/g, " ")
    .replace(/\s+/g, " ");

  const lower = normalized.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};
