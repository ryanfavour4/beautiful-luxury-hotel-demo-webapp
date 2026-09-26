import { useState } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

export type T_menu = {
  name: string;
  path?: string;
  subPath?: string; // ✅ ADD THIS
  subMenu?: {
    name: string;
    path: string;
  }[];
  icon?: string;
};

export default function NavItem({ item }: { item: T_menu }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Nav Link */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium hover:text-primary lg:text-[0.9375rem]"
      >
        {item.path ? (
          <Link to={item.path}>{item.name}</Link>
        ) : (
          <p>{item.name}</p> // dropdown trigger
        )}

        {/* <Link to={item.path}>
          <span>{item.name}</span>
        </Link> */}
        {item.subMenu && (
          <span>
            {" "}
            <Icon icon="flowbite:chevron-sort-outline" width="18" height="18" />
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {item.subMenu && isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-md">
          {item.subMenu.map((sub, index) => (
            <Link
              key={index}
              to={sub.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
