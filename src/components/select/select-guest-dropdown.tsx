import { Icon } from "@iconify/react";
import { ChangeEvent } from "react";

export default function SelectGuestDropdown({
  className = "",
  value,
  onChange,
}: {
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  // The component is controlled, so it does not manage its own state (no useState here)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(event);
  };

  return (
    <div
      className={`${className} relative col-span-2 cursor-pointer hover:border-primary hover:text-primary`}
    >
      <select
        value={value} // Uses the value prop
        onChange={handleChange} // Uses the onChange prop
        className="w-full cursor-pointer appearance-none rounded-full bg-transparent py-3 pl-11 pr-12 hover:border-primary focus:border-primary focus:outline-none md:w-full md:border-none md:bg-white"
      >
        <option value="">Guests</option>
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
        <option value="5">5 Guests</option>
        <option value="6">6 Guests</option>
        <option value="7">7 Guests</option>
        <option value="8">8 Guests</option>
      </select>

      {/* Chevron Right */}
      <Icon
        icon="flowbite:chevron-sort-outline"
        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 md:right-7"
        width="20"
        height="20"
      />

      {/* Person Icon */}
      <Icon
        icon="fluent:person-32-regular"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
        width="20"
        height="20"
      />
    </div>
  );
}
