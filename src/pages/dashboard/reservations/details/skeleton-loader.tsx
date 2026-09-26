

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse p-4 space-y-6 w-screen">
      {/* header/back link placeholder */}
      <div className="h-6 w-32 rounded bg-gray-300"></div>

      {/* top card with image and details */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="h-40 w-full lg:w-1/3 rounded bg-gray-300" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-1/2 rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-3/4 rounded bg-gray-300" />
        </div>
      </div>

      {/* pricing section placeholder */}
      <div className="space-y-2">
        <div className="h-4 w-1/3 rounded bg-gray-300" />
        <div className="h-4 w-full rounded bg-gray-300" />
        <div className="h-4 w-full rounded bg-gray-300" />
      </div>

      {/* guest details placeholder */}
      <div className="space-y-2">
        <div className="h-6 w-1/4 rounded bg-gray-300" />
        <div className="h-4 w-full rounded bg-gray-300" />
        <div className="h-4 w-full rounded bg-gray-300" />
      </div>

      {/* actions placeholder */}
      <div className="flex flex-col items-start gap-3">
        <div className="h-8 w-24 rounded bg-gray-300" />
        <div className="h-8 w-40 rounded bg-gray-300" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
