import { Icon } from "@iconify/react";
import TripImage from "../../../../public/image/ReviewImage.png";
type props={
    openModal:()=>void
}
const EmptyState = ({openModal}:props) => {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <img src={TripImage} alt="Trip Image" className="w-48" />

      <h3 className="text-lg font-bold capitalize lg:text-2xl">
        You haven’t reviewed any stays yet.
      </h3>
      <p className="w-auto text-wrap text-neutral-400">
        After you complete a stay, you’ll be invited to leave a review here.
      </p>
      <button
        className="btn flex w-auto items-center justify-center gap-2 bg-neutral-200 px-6 text-neutral-500 hover:bg-primary hover:text-white"
        onClick={openModal}
      >
        <span>
          <Icon icon={"lucide:plus"} />
        </span>
        Write a review
      </button>
    </div>
  );
};

export default EmptyState;
