import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import EmptyIcon from "/public/svg/luggage-love.svg";
import Input from "@/components/input";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <img src={EmptyIcon} alt="empty-image" className="w-24 md:w-36" />

      <span className="h-fit">
        <Input
          type="text"
          name="search"
          setState={() => null}
          state={{ value: "" }}
          placeholder="Start searching"
          onClick={() => navigate("/all-rooms")}
          icon={<Icon className="text-xl" icon={"iconamoon:search-thin"} />}
        />
      </span>

      <h3 className="text-lg font-bold capitalize lg:text-2xl">
        You haven’t booked any stays yet.
      </h3>
      <p className="w-auto text-wrap font-semibold text-text/50">
        Discover and book your next getaway now!
      </p>
    </div>
  );
};

export default EmptyState;
