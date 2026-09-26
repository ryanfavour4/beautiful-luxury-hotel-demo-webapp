import { Icon } from "@iconify/react";
import avatar from "@/../public/image/chillingroom1.jpg"
import Modal from "@/components/modal";
import { useNavigate } from "react-router";

type ConciergeOptionsProps = {
  onClose: () => void;
};

const ConciergeOptions = ({ onClose }: ConciergeOptionsProps) => {
  const navigate = useNavigate()
  return (
    <Modal
      isModalClosed={false}
      closeModal={onClose}
      parentClassName="!py-6 md:!py-10 !items-center justify-center"
      className="!w-11/12 md:!w-[28rem] lg:!w-[24rem] !h-[80vh]"
    >
      <div className="relative h-full rounded-3xl bg-white shadow-2xl">
        
        <div className="px-1">
          <h2 className="border-b-[1.5px] border-b-neutral-200 text-lg font-semibold px-3 pt-3 pb-2 text-[#454C58]">Choose a Concierge</h2>
          <div className="flex flex-col gap-3 mt-3 px-1">
          {[...Array(2)].map((i, _) => (
            <div className="flex w-full items-center justify-between hover:bg-grey/20 p-3 rounded-lg cursor-pointer" key={i} onClick={()=> navigate('request-service')}>
              <div className="flex items-center justify-normal gap-3">
                <img src={avatar} alt="Concierge" className="size-12 rounded-full" />
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-lg font-medium text-[#454C58]">David El</h3>
                  <p className="text-xs font-medium text-neutral-400 capitalize">Last seen: 18:00</p>
                </div>
              </div>
              <Icon icon={"ic:round-chevron-right"} className="size-7 text-grey mr-4" />
            </div>
          ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConciergeOptions;
