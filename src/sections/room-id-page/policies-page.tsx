import { Icon } from "@iconify/react";

const policies = [
  {
    icon: "ic:outline-login",
    title: "Check-in",
    textMain: "From 12:00 to 18:00",
    textSub: "You will need to let the property know in advance what time you will come",
  },
  {
    icon: "ic:outline-logout",
    title: "Check-out",
    textMain: "From 06:00 to 12:00",
  },
  {
    icon: "material-symbols:child-care",
    title: "Children & Beds",
    textSub: "Children of all ages are welcome. Extra bed charges may apply.",
  },
  {
    icon: "mdi:smoke-detector-off",
    title: "No Smoking",
    textSub: "Smoking is not allowed inside the property.",
  },
  {
    icon: "ion:card",
    title: "Payment",
    textSub: "Accepted payment methods: Visa, MasterCard, Mobile Transfer, and Cash.",
  },
  {
    icon: "mdi:paw-off",
    title: "Pets",
    textSub: "Pets are not allowed.",
  },
];

export default function Policies() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-dark md:text-3xl">Policies</h1>
      <p className="mb-6 font-medium">Important information before your stay.</p>
      {/* list of policies */}
      <div className="divide-y rounded-xl border p-4">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex grid-cols-12 flex-col flex-wrap gap-y-4 py-4 md:grid md:items-center md:gap-8"
          >
            {/* Left Section: Icon + Title */}
            <div className="col-span-4 flex items-center gap-3 md:block">
              <Icon icon={policy.icon} width="27" height="27" className="text-primary" />
              <p className="text-wrap font-semibold">{policy.title}</p>
            </div>

            {/* Right Section */}
            <div className="col-span-8 max-w-xl text-wrap">
              {policy.textMain && <p className="text-wrap font-medium">{policy.textMain}</p>}
              {policy.textSub && <p className="text-wrap text-sm text-text/50">{policy.textSub}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
