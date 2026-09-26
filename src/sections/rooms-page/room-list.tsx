import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import SelectGuestDropdown from "@/components/select/select-guest-dropdown";
import CustomCalendar from "@/components/calender";
import DateSelect from "@/components/date-select";
import FilterSideBar from "./filter-sidebar";
import RoomsCard from "./rooms-cards";
import { useGetAllRoomsTypes } from "@/api/hooks/useRoomTypes";
import { RoomCardSkeleton } from "./rooms-cards";
import { useBookingStore } from "@/store/booking";
import toast from "react-hot-toast";

export type LSBookingFilterType = {
  guests: number | string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
};

export type Filters = {
  amenities: string[];
  tags: string[];
};

export default function RoomList() {
  // =====================================================
  // 1️⃣ BOOKING STATE (Dates + Guests)
  // Must come first so we can use `guests` in filteredRooms
  // =====================================================
  const { bookingFilters, setBookingFilters } = useBookingStore();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const [guests, setGuests] = useState("0");

  // =====================================================
  // 2️⃣ FETCH ALL ROOMS DATA FROM API
  // =====================================================
  const { data, isLoading } = useGetAllRoomsTypes();
  // =====================================================
  // 3️⃣ FILTER STATES
  // pendingFilters → what user is selecting
  // appliedFilters → what is actually filtering rooms
  // =====================================================
  const [pendingFilters, setPendingFilters] = useState<Filters>({
    amenities: [],
    tags: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    amenities: [],
    tags: [],
  });

  // =====================================================
  // 4️⃣ DEBUG LOGS (Shows selected filters in console)
  // =====================================================

  // =====================================================
  // 5️⃣ GENERATE FILTER OPTIONS FROM ROOMS (Dynamic)
  // Creates a list of ALL unique amenities & tags
  // =====================================================

  // Get all unique amenities
  const allAmenities = [...new Set(data?.data?.flatMap((room) => room.amenities || []))];

  // Get all unique tags
  const allTags = [...new Set(data?.data?.flatMap((room) => room.tags || []))];

  // =====================================================
  // 6️⃣ FILTER ROOMS BASED ON SELECTED FILTERS
  // Room must match selected amenities, tags, and guest capacity
  // =====================================================
  const filteredRooms = data?.data?.filter((room) => {
    // Check amenities
    const amenityMatch =
      appliedFilters.amenities.length === 0 ||
      appliedFilters.amenities.some((a) => room.amenities?.includes(a));

    // Check tags
    const tagMatch =
      appliedFilters.tags.length === 0 || appliedFilters.tags.some((t) => room.tags?.includes(t));

    // ✅ Check guests
    const guestMatch = !guests || room?.maxGuests >= Number(guests);

    // Room must pass all checks
    return amenityMatch && tagMatch && guestMatch;
  });

  // =====================================================
  // 7️⃣ CLEAR ALL FILTERS
  // Resets both pending and applied filters
  // =====================================================
  const clearAllFilters = () => {
    const emptyFilters = {
      amenities: [],
      tags: [],
    };

    setPendingFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  // UPDATE SEARCH FILTER
  function handleSearchClick() {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    setBookingFilters({ checkInDate, checkOutDate, guests });
  }

  useEffect(() => {
    if (checkInDate && checkOutDate) setBookingFilters({ checkInDate, checkOutDate, guests });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInDate, checkOutDate]);

  // =====================================================
  // 8️⃣ RESTORE BOOKING FILTERS ON PAGE LOAD
  // Runs once when component mounts
  // =====================================================
  useEffect(() => {
    if (bookingFilters) {
      setCheckInDate(bookingFilters.checkInDate ? new Date(bookingFilters.checkInDate) : null);
      setCheckOutDate(bookingFilters.checkOutDate ? new Date(bookingFilters.checkOutDate) : null);
      setGuests(bookingFilters.guests as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="wrapper px-4 pt-10 md:px-1 lg:px-1">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* ---------------- FILTER SIDEBAR ---------------- */}
        <FilterSideBar
          allAmenities={allAmenities}
          allTags={allTags}
          selectedFilters={pendingFilters}
          setSelectedFilters={setPendingFilters}
          onApply={() => setAppliedFilters(pendingFilters)}
          onClearAll={clearAllFilters}
        />

        {/* ---------------- ROOM LISTING ---------------- */}
        <div className="md:col-span-9">
          <div className="mb-4 space-y-4">
            <h1 className="text-2xl font-bold text-dark">Explore Available Rooms</h1>

            <div className="w-full max-w-2xl rounded-2xl border border-gray-300 bg-white p-1.5 px-1.5 shadow-sm md:p-2 md:px-4">
              <div className="flex flex-col items-center gap-3 gap-y-1.5 md:flex-row md:justify-between">
                {/* Date Range */}
                <div className="gap-1/5 flex w-full flex-row items-center justify-between md:flex-1 md:gap-3">
                  {/* Check In */}
                  <div className="relative w-full">
                    <DateSelect
                      className="border-0 px-2"
                      onClick={() => {
                        setIsCheckInOpen(!isCheckInOpen);
                        setIsCheckOutOpen(false);
                      }}
                      title="Check in"
                      value={checkInDate}
                    />

                    {isCheckInOpen && (
                      <div className="absolute left-0 z-[9999] mt-2 max-w-sm overflow-hidden rounded-xl shadow-xl md:max-w-none">
                        <CustomCalendar
                          minDate={new Date()}
                          selectRange={false}
                          onChange={(e) => {
                            setCheckInDate(Array.isArray(e) ? e[0] : e);
                            // close check-in calendar
                            setIsCheckInOpen(false);
                            // open check-out calendar automatically
                            setIsCheckOutOpen(true);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="hidden h-10 border-l border-gray-300 md:block" />

                  {/* Check Out */}
                  <div className="relative w-full">
                    <DateSelect
                      className="border-0 px-2"
                      onClick={() => {
                        setIsCheckOutOpen(!isCheckOutOpen);
                        setIsCheckInOpen(false);
                      }}
                      title="Check out"
                      value={checkOutDate}
                    />

                    {isCheckOutOpen && (
                      <div className="absolute right-0 z-[9999] mt-2 max-w-sm overflow-hidden rounded-xl shadow-xl md:max-w-none">
                        <CustomCalendar
                          minDate={checkInDate ?? new Date()}
                          selectRange={false}
                          onChange={(e) => {
                            setCheckOutDate(Array.isArray(e) ? e[1] : e);
                            // close calendar after selection
                            setIsCheckOutOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Horizontal Divider for mobile */}
                <div className="h-px w-full bg-gray-300 md:hidden" />
                {/* Divider */}
                <div className="hidden h-10 border-l border-gray-300 md:block" />

                {/* Guests + Search */}
                <div className="flex w-full items-center justify-between md:w-auto md:justify-end md:gap-3">
                  <SelectGuestDropdown
                    onChange={(e) => {
                      setGuests(e.target.value);
                    }}
                    value={guests}
                  />
                  <button
                    className="rounded-xl bg-primary p-3 shadow-md transition hover:bg-primary/90"
                    onClick={handleSearchClick}
                  >
                    <Icon icon="lineicons:search-2" width={20} height={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              <>
                <RoomCardSkeleton />
                <RoomCardSkeleton />
                <RoomCardSkeleton />
              </>
            ) : filteredRooms && filteredRooms.length > 0 ? (
              filteredRooms.map((room) => <RoomsCard key={room._id} room={room} />)
            ) : (
              <div className="col-span-full mx-auto flex w-full items-center justify-center">
                <NoRoomData />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoRoomData() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* icon */}
      <div className="pt-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/30">
          <Icon icon="line-md:coffee-loop" width="33" height="33" className="text-primary" />
        </div>
      </div>

      <p className="pt-5 text-xl font-semibold">No rooms available</p>
      <p className="mt-2 pb-28 text-base text-grey">
        We couldn’t find any rooms matching your selection. Try adjusting your dates or filters.
      </p>
    </div>
  );
}
