import Input from "@/components/input";
import Select from "@/components/select";
import { Icon } from "@iconify/react";

import { docOptions, StepProps } from "..";
import { usePostUploadImages } from "@/api/hooks/useAuth";

const SecondStep = ({
  docType,
  setDocType,
  setDocNum,
  docNum,
  setDocFrontPreview,
  setDocFrontId,
  docFrontPreview,
}: StepProps) => {
  const { mutate: Upload } = usePostUploadImages();
  return (
    <>
      <div className="flex flex-col gap-1 pt-6">
        <label htmlFor="docType" className="text-base font-semibold text-dark/60">
          Document Type
        </label>
        <Select
          options={docOptions}
          name="docType"
          state={docType ?? { value: "" }}
          setState={setDocType ?? (() => {})}
          placeholder="Select Document Type"
          className="bg-white placeholder:text-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1 pt-4">
        <label htmlFor="docNum" className="text-base font-semibold text-dark/60">
          Document Number
        </label>
        <Input
          type="number"
          name="docNum"
          state={docNum ?? { value: "" }}
          setState={setDocNum ?? (() => {})}
          placeholder="Enter document public ID"
          className="bg-white placeholder:text-gray-400"
        />
      </div>
      <div className="pt-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-base font-semibold text-dark/60">Document Image (Front)</h4>
          <p className="text-sm text-neutral-500">
            Upload a clear photo of the front of your ID document.
          </p>
        </div>
        <label htmlFor="document-upload">
          <div className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-neutral-400 p-8">
            <input
              type="file"
              name="document-upload"
              id="document-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setDocFrontPreview?.(URL.createObjectURL(file));
                Upload(
                  { files: file, type: "kyc-document-image" },
                  {
                    onSuccess: (res) => {
                      const newImageUrl = res.data.uploads[0].url;
                      const newDocId = res.data.uploads[0]._id;
                      setDocFrontPreview?.(newImageUrl);
                      setDocFrontId?.(newDocId);
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError: (error: any) => {
                      console.log(error);
                    },
                  },
                );
              }}
            />

            {docFrontPreview ? (
              <img
                src={docFrontPreview}
                alt="Selfie Preview"
                className="h-40 w-40 rounded-xl object-cover"
              />
            ) : (
              <>
                <Icon
                  icon={"mingcute:upload-3-line"}
                  color="#9d9ea2"
                  className="size-10 rounded-full bg-gray-200 p-2"
                />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-neutral-400">PNG, JPG, JPEG up to 5MB</p>
              </>
            )}
          </div>
        </label>
      </div>
    </>
  );
};

export default SecondStep;
