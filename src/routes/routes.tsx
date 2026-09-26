import { JSX, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./protected";

const Home = lazy(() => import("@/pages/home"));
const RoomPage = lazy(() => import("@/pages/rooms"));
const ServicesPage = lazy(() => import("@/pages/services"));
const TermOfUse = lazy(() => import("@/pages/terms-of-use"));

//?? ====>> AUTH PAGES
const Register = lazy(() => import("@/pages/auth/register"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));
const Login = lazy(() => import("@/pages/auth/login"));
const Verification = lazy(() => import("@/pages/auth/verification"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));
const GoogleAuth = lazy(() => import("@/pages/auth/google-verify"));
const SendCode = lazy(() => import("@/pages/auth/send-verification-code"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Profile = lazy(() => import("@/pages/dashboard/personal-data"));
const Reservations = lazy(() => import("@/pages/dashboard/reservations"));
const Settings = lazy(() => import("@/pages/dashboard/settings"));
const Payments = lazy(() => import("@/pages/dashboard/payment-methods"));
const ReservationDetails = lazy(() => import("@/pages/dashboard/reservations/details"));
const WishLists = lazy(() => import("@/pages/dashboard/wish-lists"));
const Support = lazy(() => import("@/pages/dashboard/support"));
const LostAndFound = lazy(() => import("@/pages/dashboard/lost-and-found"));
const Reviews = lazy(() => import("@/pages/dashboard/reviews"));
const KYC = lazy(() => import("@/pages/dashboard/settings/kyc"));
const RoomsId = lazy(() => import("@/pages/room-details"));
const ServicesId = lazy(() => import("@/sections/service-page/service-id"));
const PaymentsAndBooking = lazy(() => import("@/pages/payment-booking"));
const ContactUs = lazy(() => import("@/pages/contact-us/index"));
const About = lazy(() => import("@/pages/about/index"));
const EventDetail = lazy(() => import("@/pages/event-detail"));
const Events = lazy(() => import("@/pages/events"));
const BookingConfirmation = lazy(() => import("@/pages/booking-confirmation/index"));
const ActiveBookings = lazy(
  () => import("@/pages/dashboard/reservations/details/request-service/index"),
);
const MobileChat = lazy(() => import("@/pages/dashboard/reservations/mobile-chat"));

import { LoadingPopUp } from "@/layout/loading";
const NotFound = lazy(() => import("@/layout/not-found"));

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<LoadingPopUp />}>
    <Component />
  </Suspense>
);

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={lazyLoad(Home)} />
      <Route path="/all-rooms" element={lazyLoad(RoomPage)} />
      <Route path="/services" element={lazyLoad(ServicesPage)} />
      <Route path="/sign-up" element={lazyLoad(Register)} />
      <Route path="/login" element={lazyLoad(Login)} />
      <Route path="/verify-email" element={lazyLoad(Verification)} />
      <Route path="/forgot-password" element={lazyLoad(ForgotPassword)} />
      <Route path="/reset-password" element={lazyLoad(ResetPassword)} />
      <Route path="/auth/google" element={lazyLoad(GoogleAuth)} />
      <Route path="/send-verification-code" element={lazyLoad(SendCode)} />
      <Route path="/all-rooms/:id" element={lazyLoad(RoomsId)} />
      <Route path="/services/:slug" element={lazyLoad(ServicesId)} />

      <Route path="/term-of-use" element={lazyLoad(TermOfUse)} />
      <Route path="/contact" element={lazyLoad(ContactUs)} />
      <Route path="/about" element={lazyLoad(About)} />
      <Route path="/events/:id" element={lazyLoad(EventDetail)} />
      <Route path="/events" element={lazyLoad(Events)} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/protected-home" element={lazyLoad(Home)} />
        <Route path="/payment/:slug/" element={lazyLoad(PaymentsAndBooking)} />
        <Route path="/booking-confirmation" element={lazyLoad(BookingConfirmation)} />
        <Route path="/dashboard" element={lazyLoad(Dashboard)}>
          <Route index element={lazyLoad(Profile)} />
          <Route path="personal-data" element={lazyLoad(Profile)} />
          <Route path="reservations" element={lazyLoad(Reservations)} />
          <Route path="settings" element={lazyLoad(Settings)} />
          <Route path="/dashboard/settings/kyc" element={lazyLoad(KYC)} />
          <Route path="payment-methods" element={lazyLoad(Payments)} />
          <Route path="reservations/details/:id" element={lazyLoad(ReservationDetails)} />
          <Route
            path="reservations/details/:id/request-service"
            element={lazyLoad(ActiveBookings)}
          />

          <Route path="lists" element={lazyLoad(WishLists)} />
          <Route path="support" element={lazyLoad(Support)} />
          <Route path="lost-and-found" element={lazyLoad(LostAndFound)} />
          <Route path="reviews" element={lazyLoad(Reviews)} />
        </Route>
      </Route>

      <Route path="*" element={lazyLoad(NotFound)} />
      <Route path="reservations/details/:id/concierge" element={lazyLoad(MobileChat)} />
    </Routes>
  );
}
