import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calender.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { LooseValue } from "react-calendar/dist/shared/types.js";

export default function CustomCalendar({
  onChange,
  minDate,
  startValue,
  endValue,
  selectRange = true,
}: {
  onChange: (e: Date[]) => void;
  minDate?: Date;
  startValue?: Date | null;
  endValue?: Date | null;
  selectRange?: boolean;
}) {
  const [value, setValue] = useState<Date[] | LooseValue | null>([new Date(), new Date()]);

  useEffect(() => {
    if (startValue && endValue) {
      setValue([startValue, endValue]);
    }
  }, [endValue, startValue]);

  return (
    <div className="flex justify-center">
      <div className="min-h-[200px] w-full rounded-lg bg-white p-4 shadow-xl md:p-6">
        <Calendar
          selectRange={selectRange}
          onChange={(date) => {
            const dateRange: Date[] = date as Date[];
            if (dateRange) {
              onChange(dateRange);
              setValue(dateRange);
            }
          }}
          value={value as LooseValue}
          className="calendar w-full"
          minDate={minDate}
          prevLabel={
            <Icon
              icon="material-symbols-light:chevron-left-rounded"
              className="h-10 w-10 rounded-full border border-primary p-2 text-primary"
            />
          }
          nextLabel={
            <Icon
              icon="material-symbols-light:chevron-right-rounded"
              className="h-10 w-10 rounded-full border border-primary p-2 text-primary"
            />
          }
        />
      </div>
    </div>
  );
}
