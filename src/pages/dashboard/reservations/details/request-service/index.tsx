import { Icon } from "@iconify/react";
import hotelImage from "../../../../../../public/image/charleson-building.jpg";
import gymPic from "../../../../../../public/image/gympic.jpg";
import Messenger from "@/sections/active-reservations/messenger";
import { useEditBookingStatus, useGetBookingById } from "@/api/hooks/useBooking";
import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import AlertBanner from "@/components/alert-banner/page";
import { LoadingPopUp } from "@/layout/loading";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/format-date";
import { BookingByIdResponseBookings } from "@/api/hooks/types";

const RequestService = () => {
  const { mutate, isPending } = useEditBookingStatus();
  const { auth } = useAuthStore();
  const { id } = useParams();
  const { data: bookingDetails } = useGetBookingById(id);
  const booking: BookingByIdResponseBookings | undefined = bookingDetails?.booking;

  const navigate = useNavigate();
  const [modalConfirm, setModalConfirm] = useState(false);

  const serviceRequest = [
    { title: "Fix/ Maintenance", icon: "hugeicons:tools" },
    { title: "Report an issue", icon: "boxicons:info-octagon" },
    { title: "Cleaning Request", icon: "streamline-plump:clean-broom-wipe" },
    { title: "Request Meal", icon: "material-symbols:hand-meal-outline" },
  ];

  return (
    <div className="flex w-full min-w-full flex-col items-center justify-center px-4">
      {isPending && <LoadingPopUp />}
      {modalConfirm && (
        <AlertBanner
          title="Confirm Check out Activity."
          description="Are you sure you want to check out of your room?"
          closeModal={() => setModalConfirm(false)}
          icon={<Icon icon="charm:info" color="#000000" fontSize={40} />}
          buttonText="Check out"
          buttonFunction={() =>
            mutate(
              { bookingId: id, status: "checked-out" },
              {
                onSuccess: () => {
                  toast.success("Checked out successfully!");
                  setModalConfirm(false);
                  navigate(`/dashboard/reservations/details/${id}`);
                },
              },
            )
          }
        />
      )}
      <section className="flex w-full flex-wrap items-center justify-between md:flex-nowrap">
        <div className="flex items-center justify-normal gap-2 py-6">
          <img src={hotelImage} alt="hotel-exterior" className="size-28 rounded-lg md:size-20" />
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-neutral-800 md:text-2xl">
              Welcome, {auth?.user?.fullName || auth?.user?.firstName || "User"}
            </h1>
            <div className="flex flex-col justify-normal font-medium md:flex-row md:items-center md:gap-6">
              <div className="flex items-center justify-normal gap-2 text-xs text-primary md:text-base">
                <Icon icon={"mdi:bell"} />
                <p>Room {booking?.roomId?.roomNumber}</p>
                <Icon icon={"lucide:dot"} />
                <p>{booking?.roomTypeId?.name}</p>
              </div>

              <p className="text-xs text-neutral-500 md:text-base">
                Checkout:{" "}
                {booking?.checkOutDate ? formatDate(booking.checkOutDate).commaDateFormat : "N/A"}
              </p>
            </div>
            <div className="flex flex-col justify-normal gap-1 text-xs font-medium text-neutral-500 md:flex-row md:items-center md:gap-2 md:text-base">
              <div className="flex items-center justify-normal gap-1">
                <Icon icon={"mdi:wifi"} />
                <p>Charleson_HappyHome</p>
              </div>
              <div className="flex items-center justify-normal gap-1">
                <Icon icon={"solar:password-line-duotone"} />
                <p>Jumping123!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-0 flex items-center justify-end gap-2">
          <Link to={`/reservations/details/${id}/concierge`}>
            <Icon
              icon={"mdi:message-text"}
              className="size-10 cursor-pointer rounded-lg bg-primary p-2 hover:bg-primary/50"
              color="#ffffff"
            />
          </Link>

          <Icon
            icon={"fluent:sign-out-24-regular"}
            color="#ffffff"
            className="size-10 cursor-pointer rounded-lg bg-primary p-2 hover:bg-primary/50"
            onClick={() => setModalConfirm(true)}
          />
        </div>
      </section>
      <section className="flex w-full flex-col items-stretch justify-stretch gap-5 md:flex-row">
        <div className="min-w-0">
          {/* SERVICES REQUEST  */}
          <div className="flex items-center justify-normal gap-1 pt-4">
            <Icon icon={"ph:sparkle-fill"} className="text-primary" />
            <h3 className="text-lg font-semibold text-neutral-800">Services Request</h3>
          </div>
          <div className="grid min-w-full grid-cols-2 place-items-center gap-2 pb-3 pt-4 md:place-items-stretch lg:grid-cols-4">
            {serviceRequest.map((ser, index) => (
              <div
                key={index}
                className="flex min-h-32 min-w-full flex-col items-center justify-center gap-2 rounded-lg bg-light p-4 text-center font-medium text-neutral-500 shadow-lg"
              >
                <Icon icon={ser.icon} className="size-8 text-primary" />
                <p className="font-semibold text-grey">{ser.title}</p>
              </div>
            ))}
          </div>
          {/* ACTIVE REQUESTS  */}
          <div className="flex items-center justify-normal gap-1 py-4">
            <Icon icon={"material-symbols:save-clock"} className="text-primary" />
            <h3 className="text-lg font-semibold text-neutral-800">Active Requests</h3>
          </div>
          <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-h-48">
            {serviceRequest.map((ser, index) => (
              <div className="cursor-pointer rounded-2xl bg-light p-2" key={index}>
                <div className="flex w-full items-center justify-between rounded-xl rounded-l-lg border-l-2 border-l-primary bg-[#F9F9F9] px-2 py-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={ser.icon}
                      className="size-10 rounded-full bg-primary/40 p-2 text-primary"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-neutral-600">{ser.title}</p>
                      <p className="text-xs">Requested: 19 hours ago</p>
                    </div>
                  </div>

                  <Icon icon={"fa6-solid:chevron-right"} className="text-neutral-500" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-normal gap-1 py-4">
            <Icon icon={"fluent:accessibility-more-24-filled"} className="text-primary" />
            <h3 className="text-lg font-semibold text-neutral-800">Experience More</h3>
          </div>
          <div>
            <img src={gymPic} alt="Gym" className="h-32 w-full rounded-lg object-cover" />
          </div>
        </div>
        {/* DESKTOP MESSAGE SECTION  */}
        <div className="hidden lg:block">
          <Messenger />
        </div>
      </section>
    </div>
  );
};

export default RequestService;
