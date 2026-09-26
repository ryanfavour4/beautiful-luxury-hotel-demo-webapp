import FileUpload from "@/components/file-upload";
import Input from "@/components/input";
import { useState } from "react";

type props = {
  reportModal: boolean;
  onCancel: () => void;
};

const ReportLostItem = ({ reportModal, onCancel }: props) => {
  const [itemName, setItemName] = useState({ value: "" });
  const [images, setImages] = useState<File[]>([]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm transition-all ${
        reportModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Modal Content */}
      <div className="mt-10 max-h-[90vh] w-[90%] max-w-lg overflow-y-auto rounded-md bg-white px-6 py-8 shadow-2xl">
        <div className="flex flex-col gap-1 pb-3">
          <h2 className="text-lg font-bold">Report a Lost Item</h2>
          <p className="text-xs text-neutral-400">
            Add details about the item you found so the owner can identify and claim it.
          </p>
        </div>

        <form className="pb-6">
          <div className="flex flex-col gap-1 pt-5">
            <label htmlFor="itemName" className="text-sm">
              Item Name*
            </label>
            <Input type="text" state={itemName} setState={setItemName} name="itemName" required />
          </div>

          <div className="flex flex-col gap-1 pt-5">
            <label htmlFor="description" className="text-sm">
              Description*
            </label>
            <Input
              type="text-area"
              state={itemName}
              setState={setItemName}
              name="itemName"
              required
            />
          </div>

          <div className="flex flex-col gap-1 pt-5">
            <label htmlFor="location" className="text-sm">
              Location Found*
            </label>
            <Input type="text" state={itemName} setState={setItemName} name="itemName" required />
          </div>

          <div className="flex flex-col gap-1 pt-5">
            <label htmlFor="image" className="text-sm">
              Upload Lost Image
            </label>
            <FileUpload name="lostImages" variant="dropzone" files={images} setFiles={setImages} />
          </div>

          <div className="flex items-center justify-center gap-5 pt-8">
            <button className="btn border border-black/25" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-primary" type="submit">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportLostItem;
