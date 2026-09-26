import { usePostUploadImages } from "@/api/hooks/useAuth";
import CountrySelect from "@/components/country-select";
import Input from "@/components/input";
import { Icon } from "@iconify/react";
import { StepProps } from "..";
import toast from "react-hot-toast";

const FirstStep = ({
  fullName,
  setFullName,
  country,
  setCountry,
  setSelfieId,
  selfiePreview,
  setSelfiePreview,
}: StepProps) => {
  const { mutate: Upload } = usePostUploadImages();

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-600">Identity Verification</h1>
        <p className="text-grey">Complete your KYC verification to unlock alal features</p>
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <label htmlFor="fullName" className="text-base font-semibold text-dark/60">
          Full Name
        </label>
        <Input
          type="text"
          name="fullName"
          state={fullName ?? { value: "" }}
          setState={setFullName ?? (() => {})}
          placeholder="Enter you full name"
          className="bg-white placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <label htmlFor="firstName" className="text-base font-semibold text-dark/60">
          Country
        </label>
        <CountrySelect
          value={country?.value ?? ""}
          onChange={(e) => setCountry?.({ value: e.target.value })}
          className="rounded-md border-[1.5px] border-neutral-300 bg-white px-2 placeholder:text-gray-400"
          name="country"
          placeHolder="Select your country"
        />
      </div>

      <section className="pt-4">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-dark/60">Selfie/Passport Photo</p>
          <p className="text-sm text-text/50">
            Upload a clear photo of your face. Ensure good lightening and no obstructions.
          </p>
        </div>
        <label htmlFor="photo-upload">
          <div className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-neutral-400 p-8">
            <input
              type="file"
              name="photo-upload"
              id="photo-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setSelfiePreview?.(URL.createObjectURL(file));
                Upload(
                  { files: file, type: "kyc-selfie-image" },
                  {
                    onSuccess: (res) => {
                      toast.success("Upload success");
                      const newImageUrl = res.data.uploads[0].url;
                      const newImageId = res.data.uploads[0]._id;
                      setSelfieId?.(newImageId);
                      setSelfiePreview?.(newImageUrl);
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError: (error: any) => {
                      console.log(error);
                    },
                  },
                );
              }}
            />

            {selfiePreview ? (
              <img
                src={selfiePreview}
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
      </section>
    </>
  );
};

export default FirstStep;
