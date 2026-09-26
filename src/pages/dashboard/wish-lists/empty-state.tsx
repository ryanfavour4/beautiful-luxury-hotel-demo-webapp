import { Icon } from "@iconify/react";
import EmptyIcon from "/public/svg/love-light.svg";
import Input from "@/components/input";
import { useNavigate } from "react-router";

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

      <h3 className="text-lg font-bold capitalize lg:text-xl">
        You haven’t added any items to your wish list yet
      </h3>
      <p className="w-auto text-wrap font-semibold text-text/50">
        Start exploring and add your favorite destinations here!
      </p>
    </div>
  );
};

export default EmptyState;
