// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupTransactionsByDate = (transactions: any[] | [] | undefined) => {
  if (!transactions) return {};
  if (transactions.length < 1) return {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return transactions.reduce<Record<string, any[]>>((acc, transaction) => {
    const dateObj = new Date(transaction.createdAt);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = dateObj.getFullYear();
    const date = `${month}/${day}/${year}`; // Format: MM/DD/YYYY

    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);

    return acc;
  }, {});
};
