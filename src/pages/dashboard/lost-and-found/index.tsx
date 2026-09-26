import { Icon } from "@iconify/react";
import { useState } from "react";
import ReportLostItem from "./report-lost-item";
const Index = () => {
  const lostAndFoundItems = [
    {
      id: "1",
      title: "Wallet",
      image: "/image/wallet.png",
      description: "Found near the reception desk. Contains credit cards",
      location: "Main Lobby",
      date: "30/11/2025",
      status: "Unclaimed",
    },
    {
      id: "2",
      title: "i-phone 11",
      image: "/image/wallet.png",
      description: "Found near the reception desk. Contains credit cards",
      location: "Main Lobby",
      date: "30/11/2025",
      status: "Pending",
    },
    {
      id: "3",
      title: "Brown Leather Bag",
      image: "/image/wallet.png",
      description: "Found near the reception desk.",
      location: "Main Lobby",
      date: "30/11/2025",
      status: "Unclaimed",
    },
  ];
  const [reportModal, setReportModal] = useState(false);

  return (
    <div className="flex min-h-full w-full flex-col rounded-2xl rounded-tl-lg bg-light px-6 py-6 lg:ml-4">
      <ReportLostItem reportModal={reportModal} onCancel={() => setReportModal(false)} />
      <div className="flex w-full flex-col items-start justify-between pb-6 md:flex-row md:items-center md:pb-0">
        <div className="flex flex-col gap-1 pb-6">
          <h2 className="text-2xl font-bold">Lost & Found </h2>
          <p className="font-medium text-grey">Help reunite guests with their belongings</p>
        </div>
        <button
          className="btn flex w-auto items-center justify-center gap-2 bg-neutral-200 text-neutral-500 hover:bg-primary hover:text-white md:px-6"
          onClick={() => setReportModal(true)}
        >
          <span>
            <Icon icon={"lucide:plus"} />
          </span>
          Report Lost item
        </button>
      </div>
      <div className="flex flex-col items-start justify-normal gap-6 md:flex-row">
        {lostAndFoundItems.map((item) => (
          <div key={item.id} className="flex h-full flex-col rounded-lg border border-neutral-300 p-3 md:min-h-[480px]">
            <img src={item.image} alt="Propert Picture" className="w-full rounded-md" />
            <div className="flex items-center justify-between py-3">
              <h1 className="text-xl font-bold">{item.title}</h1>
              <p
                className={`rounded-lg ${item.status.toLowerCase() === "pending" ? "bg-warning" : "bg-neutral-300"} p-1 px-3 text-xs text-neutral-500`}
              >
                {item.status}
              </p>
            </div>
            <p className="text-sm text-neutral-400">{item.description}</p>
            <div className="flex flex-col gap-2 pt-2 text-sm font-[600] text-neutral-400">
              <div className="flex items-center justify-normal gap-2">
                <Icon icon={"material-symbols:location-on-outline-rounded"} />
                <p>{item.location}</p>
              </div>
              <div className="flex items-center justify-normal gap-2">
                <Icon icon={"lucide:calendar"} />
                <p>{item.date}</p>
              </div>
            </div>
            {item.status.toLowerCase() === "unclaimed" && (
              <button className="btn  bg-neutral-200 mt-4 md:mt-auto">Claim This item</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
