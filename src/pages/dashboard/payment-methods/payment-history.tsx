import { PaymentStatusEnums } from "@/api/hooks/types";
import { useGetMyPayments } from "@/api/hooks/usePayment";
import { formatDate } from "@/utils/format-date";
import { useEffect, useState } from "react";

const statusConfig: Record<PaymentStatusEnums, { bg: string; text: string; dot: string }> = {
  successful: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  refunded: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-400",
  },
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  failed: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  cancelled: { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
};

const TransactionIcon = ({
  status,
  isRefund,
}: {
  status: PaymentStatusEnums;
  isRefund?: boolean;
}) => {
  if (isRefund) {
    return (
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
        <svg
          className="h-4 w-4 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentC          olor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
        <svg
          className="h-4 w-4 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-4 w-4 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
      <svg
        className="h-4 w-4 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    </div>
  );
};

const MiniChart = ({ color }: { color: string }) => (
  <svg viewBox="0 0 60 30" className="h-8 w-16" fill="none">
    <polyline
      points="0,20 10,14 20,18 30,8 40,12 50,6 60,10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function PaymentHistory() {
  const [page, setPage] = useState<number>(1);
  const { data, isSuccess } = useGetMyPayments(page);
  const [filteredData, setFilteredData] = useState(data?.data || []);
  const [status, setStatus] = useState({ value: "" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(setPage);
  console.log(setStatus);
  const statCards = [
    {
      label: "Total Spent",
      value: "₦325,450",
      sub: "All time",
      color: "#10b981",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      icon: (
        <svg
          className="h-5 w-5 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Successful Payments",
      value: "18",
      sub: "Completed bookings",
      color: "#3b82f6",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      icon: (
        <svg
          className="h-5 w-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Refunded",
      value: "₦45,000",
      sub: "From 2 bookings",
      color: "#f97316",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      icon: (
        <svg
          className="h-5 w-5 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: "₦12,500",
      sub: "1 transaction",
      color: "#a855f7",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      icon: (
        <svg
          className="h-5 w-5 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    console.log(data?.data);
  }, [data]);

  useEffect(() => {
    if (status.value && data) {
      const filteredStatusData =
        data.data?.filter((payment) => payment.status === status.value) || [];
      setFilteredData(filteredStatusData);
    } else {
      setFilteredData(data?.data || []);
    }
  }, [data, status]);

  useEffect(() => {
    if (isSuccess && data?.data) setFilteredData(data?.data);
  }, [data?.data, isSuccess]);

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2 border-b-2 border-b-neutral-100">
          <h1 className="text-2xl font-bold text-dark/60"> Payment History</h1>
          <p className="text-grey">
            Securely add or remove payment methods to make it easier when you book
          </p>
        </div>
        <button className="font-500 flex items-center gap-2 self-start whitespace-nowrap rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 sm:self-auto">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Statement
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={`h-9 w-9 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                {card.icon}
              </div>
              <MiniChart color={card.color} />
            </div>
            <p className="font-500 mb-1 text-[11px] uppercase tracking-wide text-gray-500 sm:text-xs">
              {card.label}
            </p>
            <p className="font-700 text-lg leading-tight text-gray-900 sm:text-xl">{card.value}</p>
            <p className="mt-0.5 text-[11px] text-gray-400">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:p-5">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by booking ID or hotel"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm transition-all placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            />
          </div>

          <div className="flex gap-2 sm:gap-3">
            {/* Date range */}
            <div className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600 transition-colors hover:border-gray-300">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden sm:inline">May 1, 2024 – May 17, 2025</span>
              <span className="sm:hidden">Date</span>
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-600 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            >
              {["All Status", "Paid", "Refunded", "Pending", "Failed"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            {/* Filter btn */}
            <button className="font-500 flex items-center gap-2 whitespace-nowrap rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-700 transition-colors hover:bg-amber-100 sm:px-4">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Transaction", "Booking / Hotel", "Date", "Amount", "Status", "Action"].map(
                  (h) => (
                    <th
                      key={h}
                      className="font-600 px-5 py-3.5 text-left text-[11px] uppercase tracking-widest text-gray-400"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((txn) => {
                const sc = statusConfig[txn.status];
                return (
                  <tr key={txn._id} className="group transition-colors hover:bg-gray-50/60">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <TransactionIcon status={txn.status} isRefund={txn.status === "refunded"} />
                        <div>
                          <p className="font-500 text-sm capitalize text-text">{txn.method}</p>
                          <p className="mono text-xs text-gray-400">{txn.reference}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-500 mono text-sm text-gray-700">{txn._id}</p>
                      <p className="text-xs text-gray-400">{txn?.hotelId?.name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        {formatDate(txn.createdAt).commaDateFormat}
                      </p>
                      <p className="text-xs text-gray-400">{new Date(txn.createdAt).getTime()}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(txn.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p
                        className={`font-600 mono text-sm ${txn.status === "refunded" ? "text-orange-500" : "text-gray-900"}`}
                      >
                        {txn.status === "refunded" ? "- " : ""}
                        {formatNaira(txn.amount)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-600 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${sc?.bg} ${sc?.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${sc?.dot}`} />
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        {txn.status !== "pending" && txn.status !== "failed" ? (
                          <>
                            <button className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </button>
                            <button className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <button className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {filteredData.map((txn) => {
            const sc = statusConfig[txn.status];
            return (
              <div key={txn._id} className="p-4 transition-colors hover:bg-gray-50/60">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <TransactionIcon status={txn.status} isRefund={txn.status === "refunded"} />
                    <div className="min-w-0">
                      <p className="font-500 truncate text-sm text-gray-800">{txn.method}</p>
                      <p className="mono text-xs text-gray-400">{txn.reference}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="mono font-500 text-xs text-gray-500">{txn._id}</span>
                        <span className="text-gray-300">·</span>
                        <span className="truncate text-xs text-gray-500">{txn?.hotelId?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p
                      className={`font-600 mono text-sm ${txn.status === "refunded" ? "text-orange-500" : "text-gray-900"}`}
                    >
                      {txn.status === "refunded" ? "- " : ""}
                      {formatNaira(txn.amount)}
                    </p>
                    <span
                      className={`font-600 mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${sc.bg} ${sc.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                      {txn.status}
                    </span>
                  </div>
                </div>
                <p className="ml-12 mt-2 text-xs text-gray-400">
                  {formatDate(txn.createdAt).commaDateFormat} ·{" "}
                  {new Date(txn.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {formatDate(txn.createdAt).commaDateFormat} ·{" "}
                  {new Date(txn.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-4 sm:flex-row sm:px-5">
          <p className="text-xs text-gray-400">Showing 1 to 5 of 24 transactions</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`font-500 flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all ${
                  currentPage === p
                    ? "border border-amber-500 bg-amber-500 text-white shadow-sm"
                    : "border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-500">
              ...
            </button>
            <button
              onClick={() => setCurrentPage(5)}
              className={`font-500 flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all ${
                currentPage === 5
                  ? "border border-amber-500 bg-amber-500 text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              5
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
