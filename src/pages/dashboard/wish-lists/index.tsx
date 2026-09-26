import { useState } from "react";
import EmptyState from "./empty-state";
import { Icon } from "@iconify/react";
import Hotel from "../../../../public/image/charleson-building.jpg";

const Index = () => {
  const [lists] = useState([{ name: "hello" }]);

  return (
    <div className="flex min-h-screen w-full flex-col rounded-2xl bg-light px-6 py-6 lg:ml-4">
      {lists.length > 0 ? <EmptyState /> : <Lists />}
    </div>
  );
};

export default Index;

export const Lists = () => {
  return (
    <div>
      <div className="flex w-full items-start justify-between pb-12 md:items-center">
        <div className="flex flex-col items-start justify-normal gap-1">
          <h2 className="text-2xl font-bold text-dark/35">Wish Lists</h2>
          <p className="text-grey">Explore and save your favorite destinations here.</p>
        </div>
        <button className="btn flex w-full items-center justify-center gap-2 border border-black/25 md:w-auto">
          <span>
            <Icon icon={"lucide:plus"} />
          </span>
          Create a List
        </button>
      </div>
      <div className="flex max-w-full flex-col items-center justify-normal gap-4 md:flex-row">
        {[...Array(3)].map((_, idx) => (
          <div key={idx}>
            <img
              src={Hotel}
              alt="hotel view"
              className="h-72 w-full rounded-lg object-cover md:size-80"
            />
            <p className="pt-4 text-lg font-semibold">Luxury Exquisite</p>
            <p className="font-semibold">2 Saved</p>
          </div>
        ))}
      </div>
    </div>
  );
};
