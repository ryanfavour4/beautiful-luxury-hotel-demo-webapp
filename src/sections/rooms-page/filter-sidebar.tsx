import { Icon } from "@iconify/react";
import { useState } from "react";
import { Filters } from "./room-list";

type FilterProps = {
  allAmenities: string[];
  allTags: string[];
  selectedFilters: Filters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply: () => void;
  onClearAll: () => void;
  className?: string;
};

export default function FilterSideBar({
  selectedFilters,
  setSelectedFilters,
  allAmenities,
  allTags,
  onApply,
  onClearAll,
  className,
}: FilterProps) {
  const filterMenu = [
    {
      title: "Amenities",
      key: "amenities" as const,
      subMenu: allAmenities.map((amenity) => ({
        name: amenity,
        value: amenity,
      })),
    },
    {
      title: "Tags",
      key: "tags" as const,
      subMenu: allTags.map((tag) => ({
        name: tag,
        value: tag,
      })),
    },
  ];

  const handleCheckboxChange = (category: "amenities" | "tags", value: string) => {
    setSelectedFilters((prev) => {
      const exists = prev[category].includes(value);

      return {
        ...prev,
        [category]: exists
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  const [openIndex, setOpenIndex] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`hidden md:col-span-3 md:block ${className}`}>
      <div className="w-full rounded-xl border bg-white p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClearAll} className="text-sm font-semibold text-primary">
            Clear
          </button>
        </div>

        {/* Select Filters */}
        <div className="space-y-3">
          {filterMenu.map((menu, index) => (
            <ul key={index} className="border-b pb-3">
              <div
                onClick={() => handleToggle(index)}
                className="flex cursor-pointer items-center justify-between"
              >
                {/* Title */}
                <p className="font-medium">{menu.title}</p>

                {/* Dropdown Icon Only if it has submenu */}
                {menu.subMenu && (
                  <Icon
                    icon="mdi-light:chevron-down"
                    className={`text-xl transition-transform ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                )}
              </div>

              {/* Dropdown SubMenu */}
              {menu.subMenu && openIndex === index && (
                <ul className="mt-2 flex w-full flex-col gap-2 bg-white py-2 pl-2">
                  {menu.subMenu.map((subMenu, idx) => (
                    <li key={idx} className="w-full">
                      <label className="flex w-full cursor-pointer items-center justify-between rounded px-2 py-1 text-sm hover:bg-gray-100">
                        <span className="text-gray-800">{subMenu.name}</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 bg-primary accent-primary"
                          checked={selectedFilters[menu.key as "amenities" | "tags"]?.includes(
                            subMenu.value,
                          )}
                          onChange={() =>
                            handleCheckboxChange(menu.key as "amenities" | "tags", subMenu.value)
                          }
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          ))}
        </div>
      </div>

      {/* Apply Button (Fixed Width Matching Filter Box) */}
      <button
        onClick={onApply}
        className="mt-4 w-full rounded-md bg-primary py-3 text-white shadow-md"
      >
        Apply Filters
      </button>
    </div>
  );
}
