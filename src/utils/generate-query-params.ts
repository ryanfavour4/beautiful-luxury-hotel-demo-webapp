export const generateQueryParams = (
  params: Record<string, string | number | boolean | null | undefined>,
): string => {
  const entries = Object.entries(params).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value !== undefined && value !== null && value !== "",
  );

  if (!entries.length) return "";

  const query = entries
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");

  return `?${query}`;
};
