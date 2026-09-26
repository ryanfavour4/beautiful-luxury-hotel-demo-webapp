import { Icon } from "@iconify/react";

const index = () => {
  return (
    <div className="flex min-h-screen w-full flex-col rounded-2xl rounded-tl-lg bg-light px-6 py-6 lg:ml-4">
      <div className="flex flex-col gap-1 pb-6">
        <h2 className="text-2xl font-bold">Support</h2>
        <p className="text-grey">Have questions or feedback for us? We're listening</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-300 p-3">
          <div className="flex items-center justify-normal gap-2 text-dark/60">
            <Icon icon={"fluent:chat-32-regular"} fontSize={20}  />
            <p>Chat now</p>
          </div>
          <Icon icon={"lucide:chevron-right"} fontSize={24} className="text-grey" />
        </div>
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-300 p-3">
          <div className="flex items-center justify-normal gap-2 text-dark/60">
            <Icon icon={"fluent:chat-32-regular"} fontSize={20} />
            <p>Room Service</p>
          </div>
          <Icon icon={"lucide:chevron-right"} fontSize={24} className="text-grey" />
        </div>
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-300 p-3">
          <div className="flex items-center justify-normal gap-2 text-dark/60">
            <Icon icon={"streamline:help-chat-2"} fontSize={20}/>
            <p>Visit Help Center</p>
          </div>
          <Icon icon={"lucide:chevron-right"} fontSize={24} className="text-grey" />
        </div>
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-neutral-300 p-3">
          <div className="flex items-center justify-normal gap-2 text-dark/60">
            <Icon icon={"ph:pencil-simple"} fontSize={20}/>
            <p>Share your feedback</p>
          </div>
          <Icon icon={"lucide:chevron-right"} fontSize={24} className="text-grey" />
        </div>
      </div>
    </div>
  );
};

export default index;
