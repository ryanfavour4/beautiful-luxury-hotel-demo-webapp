import Input from "@/components/input";
import { Icon } from "@iconify/react";
import { useState } from "react";

type props = {
  reviewModal: boolean;
  onCancel: () => void;
};
const WriteReview = ({ reviewModal, onCancel }: props) => {
  const [itemName, setItemName] = useState({ value: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm transition-all ${
        reviewModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Modal Content */}
      <div className="mt-10 max-h-[90vh] w-[90%] max-w-lg overflow-y-auto rounded-md bg-white px-6 py-8 shadow-2xl">
        <div className="flex flex-col gap-1 pb-3">
          <h2 className="text-lg font-bold">Write a review</h2>
          <p className="text-xs text-neutral-400">
            Share your experience with us. Your feedback helps us serve you better.
          </p>
        </div>

        <form className="pb-6">
          <div className="flex flex-col gap-1 pt-5">
            <label htmlFor="itemName" className="text-sm">
              Review Title*
            </label>
            <Input type="text" state={itemName} setState={setItemName} name="itemName" required />
          </div>

          <div className="flex flex-col gap-1 pt-5">
            <label htmlFor="description" className="text-sm">
              Your Review*
            </label>
            <Input
              type="text-area"
              state={itemName}
              setState={setItemName}
              name="itemName"
              required
            />
          </div>
          {/* Stars */}
          <div>
            <label htmlFor="rating" className="text-sm">
              Rating*
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => {
                const isActive = i <= (hover || rating);

                return (
                  <Icon
                    key={i}
                    icon={isActive ? "fluent-emoji-flat:star" : "proicons:star"}
                    width="25"
                    height="25"
                    className="cursor-pointer"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(i)}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 pt-8">
            <button className="btn border border-black/25" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
