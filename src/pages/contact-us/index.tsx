import Navbar from "@/layout/top-nav-bar";
import suiteWithCityView from "/image/chillingroom1.jpg";
import { useAuthStore } from "@/store/auth";
import Input from "@/components/input";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router";
import Footer from "@/layout/footer";
import { useForm } from "@formspree/react";
import toast from "react-hot-toast";
import { useSubmitContactForm } from "@/api/hooks/useContact";

type Contact = {
  Icon: string;
  title: string;
  desc: string;
  link: string;
  navigation: string;
};

interface contactCardProps {
  contact: Contact;
}

const contactCard = [
  {
    Icon: "icon-park-solid:message",
    title: "Chat to support",
    desc: "We're happy to help you.",
    navigation: "Email Us: reservations@charlsonluxuryhotels.com",
    link: "mailto:reservations@charlsonluxuryhotels.com",
  },
  {
    Icon: "mynaui:map-pin-solid",
    title: "Visit us",
    desc: "Visit our office location.",
    navigation: "3-7 Beautiful Drive, Igwuruta-Ali Off Airport Road, 511101 Port Harcourt, Nigeria",
    link: "https://maps.app.goo.gl/3riztJUS3nBkc1oR7",
  },
  {
    Icon: "entypo:old-phone",
    title: "Call us",
    desc: "Speak to our friendly team.",
    navigation: "Call Us: +234-909-999-9957 ",
    link: "tel:+2349099999957",
  },
];

export default function ContactUs() {
  const { auth } = useAuthStore();
  const queryParams = new URLSearchParams(window.location.search);
  const type = queryParams.get("type");
  const { mutate } = useSubmitContactForm();

  const [firstName, setFirstName] = useState({ value: "" });
  const [lastName, setLastName] = useState({ value: "" });
  const [title, setTitle] = useState({ value: "" });
  const [email, setEmail] = useState({ value: auth?.user?.email || "" });
  const [phone, setPhone] = useState({ value: auth?.user?.phone || "" });

  const [specialRequest, setSpecialRequest] = useState({ value: "" });

  const [state, handleSubmit] = useForm("xkgozzlj");
  const formRef = React.useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (auth?.user) {
      setFirstName({ value: "" });
      setLastName({ value: "" });
      setTitle({ value: "" });
      setEmail({ value: auth.user.email || "" });
      setPhone({ value: auth.user.phone || "" });
      setSpecialRequest({ value: "" });
    }
  }, [auth?.user]);

  useEffect(() => {
    if (type === "manual-booking") {
      setTitle({ value: "Manual Booking Request" });
      setSpecialRequest({ value: "I need assistance with a manual booking." });
    }
  }, [type]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name: firstName.value + " " + lastName.value,
      message: specialRequest.value,
      subject: title.value,
      phone: phone.value,
      email: email.value,
    });
    await handleSubmit(e)
      .then(() => {
        toast.success("Email sent successfully!");
        if (formRef.current) {
          formRef.current.reset();
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_err) => {
        toast.error("An error occurred, please try again!");
      });
  };

  return (
    <div>
      {/* navbar */}

      {/* hero */}
      <div
        className="relative h-[500px] w-full overflow-hidden bg-cover bg-center bg-no-repeat pb-12 pt-2.5"
        style={{ backgroundImage: `url(${suiteWithCityView})` }}
      >
        {/* Dark overlay — only affects background */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        {/* Navbar — ABOVE overlay */}
        <nav className="relative z-20">
          <Navbar />
        </nav>

        {/* Header content */}
        <div className="relative z-10 flex h-3/4 flex-col items-center justify-center">
          <h1 className="mx-auto max-w-3xl text-balance py-10 text-center text-4xl font-medium text-light md:py-20 md:text-6xl">
            Your Comfort Starts With a Conversation
          </h1>
        </div>
      </div>

      {/* form */}
      <div className="relative z-10 -mt-40 flex justify-center px-4 sm:px-6 lg:px-8">
        <form
          className="flex w-full max-w-2xl flex-col rounded-2xl border border-gray-200 bg-light px-6 py-10 shadow"
          ref={formRef}
          onSubmit={handleFormSubmit}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-dark/70">First Name</label>
              <Input
                type="text"
                name="firstName"
                state={firstName}
                setState={setFirstName}
                icon={<Icon icon="mingcute:user-2-line" fontSize={22} />}
                placeholder="e.g John"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-dark/70">Last Name</label>
              <Input
                type="text"
                name="lastName"
                state={lastName}
                setState={setLastName}
                icon={<Icon icon="mingcute:user-2-line" fontSize={22} />}
                placeholder="e.g Doe"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-dark/70">Email</label>
              <Input
                type="email"
                name="email"
                state={email}
                setState={setEmail}
                icon={<Icon icon="majesticons:mail-line" fontSize={22} />}
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-dark/70">Phone Number</label>
              <PhoneInput
                country="ng"
                value={phone.value}
                onChange={(phone) => setPhone({ value: phone })}
                inputClass="!w-full !bg-transparent !h-[2.65rem]"
                buttonClass="!bg-transparent !shadow-none !rounded-l-md !rounded-r-none"
                containerClass="!rounded-lg border border-gray-300 !bg-transparent"
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1 pt-7">
            <label className="font-semibold text-dark/70">Title</label>
            <Input
              type="text"
              name="title"
              state={title}
              setState={setTitle}
              icon={<Icon icon="material-symbols:titlecase-rounded" fontSize={22} />}
              placeholder="Subject or Title"
            />
          </div>

          {/* Special request */}
          <div className="flex flex-col gap-1 pt-7 text-left">
            <label className="font-semibold text-dark/70">How can we help you?</label>

            <Input
              name="specialRequest"
              type="text-area"
              state={specialRequest}
              setState={setSpecialRequest}
              placeholder="i have a problem when making payment..."
            />
          </div>

          <button className="btn-primary mt-6 flex items-center gap-2" disabled={state.submitting}>
            <p>{state.submitting ? "Submitting..." : "Send Message"}</p>
            {state.submitting && <Icon icon={"line-md:loading-loop"} className="animate-spin" />}
          </button>
        </form>
      </div>
      {/* card */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactCard.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export function ContactCard({ contact }: contactCardProps) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 pb-10 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="w-fit rounded-md border p-3">
        <Icon icon={contact.Icon} width="22" height="22" />
      </div>

      <h1 className="mt-8 text-lg font-semibold">{contact.title}</h1>
      <p className="mt-2 text-sm text-gray-600">{contact.desc}</p>

      <Link to={contact.link} className="mt-4 inline-block text-sm font-medium text-primary">
        {contact.navigation}
      </Link>
    </div>
  );
}
