import Navbar from "@/layout/top-nav-bar";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

export default function CancelledBooking() {
  return (
    <>
    <Navbar/>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto flex max-w-screen-sm flex-col items-center justify-center text-center">
            <Icon
              icon={"pajamas:canceled-circle"}
              className="mb-4 text-5xl font-extrabold tracking-tight text-primary lg:text-7xl"
            />
            <p className="text-textcolor mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              Booking Cancelled
            </p>
            <p className="text-textcolor mb-4 text-base font-light">
              Your reservation was not completed because payment was not processed. If this was a
              mistake, you can start a new booking anytime — we'd love to have you stay with us.
            </p>
            <div className="flex gap-4 items-center ">
              <Link to={"/all-rooms"} className="btn-primary mx-auto w-fit px-9">
                Book Again
              </Link>
              <Link
                to={"/dashboard/personal-data"}
                className="btn w-auto border border-primary text-primary"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
