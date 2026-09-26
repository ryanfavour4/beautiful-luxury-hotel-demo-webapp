import Logo from "@/components/logo/index";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-black px-4 pt-12 text-white md:px-10">
      <div className="flex h-auto w-full flex-col justify-between gap-14 md:flex-row md:gap-24">
        {/* logo + social */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {/* logo + text */}
          <Link to={"/"} className="flex flex-col items-center gap-4 md:flex-row md:items-center">
            <Logo variant="icon" className="w-17" />
            <h3 className="flex flex-col text-2xl font-bold text-primary md:ml-2">
              <span> Beautiful</span> <span> Luxury Hotel</span>
            </h3>
          </Link>

          <p className="mt-4 max-w-xs text-gray-300">
            We help you find and book the perfect stay from cozy guesthouses to top hotels with
            ease, trust, and the best deals.
          </p>

          {/* media links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 md:justify-start">
            <a href={"https://www.facebook.com/CharlesonLuxury/"}>
              <Icon icon="mage:facebook" className="h-6 w-6 text-primary" />
            </a>
            <a href={"https://www.youtube.com/@CharlesonLuxury"}>
              <Icon icon="basil:youtube-solid" className="h-6 w-6 text-primary" />
            </a>
            <a href={"https://www.linkedin.com/company/charlesonluxury"}>
              <Icon icon="basil:linkedin-solid" className="h-6 w-6 text-primary" />
            </a>
            <a href={"https://x.com/charlesonluxury"}>
              <Icon icon="garden:twitter-fill-12" className="h-5 w-5 text-primary" />
            </a>
            <a href={"https://www.instagram.com/charlesonluxury"}>
              <Icon icon="ri:instagram-fill" className="h-6 w-6 text-primary" />
            </a>
          </div>
        </div>

        {/* links section */}
        <div className="grid w-full grid-cols-1 gap-8 text-center sm:grid-cols-2 md:w-auto md:grid-cols-3 md:gap-4 md:text-left">
          {/* quick links */}
          <div>
            <h2 className="pb-4 text-xl font-semibold text-white">Quick Links</h2>
            <ul className="flex flex-col gap-2 text-base text-gray-300">
              <li>
                <Link to="/dashboard/reservations">Bookings</Link>
              </li>
              <li>
                <Link to={"/services"}>Services</Link>
              </li>
              <li>
                <Link to={"/dashboard/chat"}>Chat</Link>
              </li>
              <li>
                <Link to={"/dashboard/personal-data"}>Profile</Link>
              </li>
            </ul>
          </div>

          {/* legal */}
          <div>
            <h2 className="pb-4 text-xl font-semibold text-white">Legal</h2>
            <ul className="flex flex-col gap-2 text-base text-gray-300">
              <li>
                <Link to={"/term-of-use"}>Term of Use</Link>
              </li>
              <li>
                <Link to={"/contact"}>Help Center</Link>
              </li>
              <li>
                <Link to={"/term-of-use/#ppyes"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h2 className="pb-4 text-xl font-semibold text-white">Contact Us</h2>
            <ul className="flex flex-col gap-3 text-base text-gray-300">
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <a href="tel:+2349099999957">+234-909-999-9957</a>
              </li>
              <Link to={"https://maps.app.goo.gl/3riztJUS3nBkc1oR7"}>
                <li className="flex items-start justify-center gap-2 md:justify-start">
                  <span className="max-w-xs text-left sm:max-w-sm md:max-w-60">
                    3-7 Beautiful Drive, Igwuruta-Ali Off Airport Road, 511101 Port Harcourt,
                    Nigeria
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* footer bottom */}
      <div className="mt-10 border-t border-gray-800 pb-4 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Beautiful’s Hotel. All rights reserved.
      </div>
    </section>
  );
}
