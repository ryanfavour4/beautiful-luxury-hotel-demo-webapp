export const ReservationSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-start justify-normal gap-4 border-t-[1.5px] border-t-neutral-300 py-8 first-of-type:border-t-0 first-of-type:pt-0 md:flex-row md:items-center animate-pulse">
      {/* Image skeleton */}
      <div className="size-20 rounded-lg bg-neutral-200" />

      {/* Content skeleton */}
      <div className="min-w-screen flex w-full flex-col items-center justify-between gap-3 pt-5">
        {/* Header section */}
        <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
          {/* Room name and icon */}
          <div className="flex items-center gap-2 w-32">
            <div className="h-5 w-5 rounded bg-neutral-200" />
            <div className="h-4 flex-1 rounded bg-neutral-200" />
          </div>

          {/* Status and ID */}
          <div className="flex items-center gap-2 w-48">
            <div className="h-6 w-20 rounded-full bg-neutral-200" />
            <div className="h-4 flex-1 rounded bg-neutral-200" />
          </div>
        </div>

        {/* Divider */}
        <hr className="h-[1.5px] w-[96%] bg-neutral-200" />

        {/* Details section */}
        <div className="flex w-full flex-wrap items-center justify-between gap-3 lg:flex-nowrap lg:gap-0 lg:pt-3">
          <div className="flex flex-wrap items-center justify-normal gap-4 text-xs lg:gap-10 flex-1">
            {/* Check in */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 rounded bg-neutral-200" />
              <div className="h-3 w-24 rounded bg-neutral-200" />
            </div>

            {/* Check out */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 rounded bg-neutral-200" />
              <div className="h-3 w-24 rounded bg-neutral-200" />
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-12 rounded bg-neutral-200" />
              <div className="h-3 w-16 rounded bg-neutral-200" />
            </div>
          </div>

          {/* Check Details button */}
          <div className="h-4 w-24 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

export const ReservationsPageSkeleton = () => {
  // Show 3 skeleton items
  return (
    <div>
      {/* Header skeleton */}
      <div className="flex flex-col gap-2 pb-8">
        <div className="h-8 w-40 rounded bg-neutral-200" />
        <div className="h-4 w-64 rounded bg-neutral-200" />
      </div>

      {/* Skeletons list */}
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((item) => (
          <ReservationSkeleton key={item} />
        ))}
      </div>
    </div>
  );
};
