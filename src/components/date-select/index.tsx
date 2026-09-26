import { formatDate } from "@/utils/format-date";
import { Icon } from "@iconify/react";

export default function DateSelect({
  value,
  onClick,
  className = "",
  title = "Check in",
}: {
  value: Date | string | null;
  onClick: () => void;
  className?: string;
  title: string;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} flex w-full items-center justify-between gap-2 rounded-full border border-gray-200 px-4 py-3 hover:border-primary hover:text-primary`}
      >
        <div className="flex items-center gap-2">
          <Icon icon="solar:calendar-linear" width="20" height="20" />
          <span className="">{value ? formatDate(value).commaDateFormat : title}</span>
        </div>
        <Icon icon="flowbite:chevron-sort-outline" width="18" height="18" />
      </button>
    </>
  );
}
