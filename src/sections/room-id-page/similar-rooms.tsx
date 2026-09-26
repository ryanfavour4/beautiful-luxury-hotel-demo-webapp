import { useGetAllRoomsTypes } from "@/api/hooks/useRoomTypes";
import RoomsCard, { RoomCardSkeleton } from "@/sections/rooms-page/rooms-cards";
export function SimilarRooms() {
  const { data, isLoading } = useGetAllRoomsTypes();

  return (
    <div className="py-10">
      <h1 className="pb-5 text-3xl font-bold text-dark">Similar Rooms in Beautiful Luxury Hotel </h1>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 lg:grid-cols-4 lg:gap-6 lg:overflow-scroll">
        {isLoading && (
          <>
            <RoomCardSkeleton />
            <RoomCardSkeleton />
          </>
        )}
        {data && data?.data?.slice(0,4).map((room) => <RoomsCard key={room._id} room={room} />)}
      </div>
    </div>
  );
}
