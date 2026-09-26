import CountrySelect from "@/components/country-select";
import Input from "@/components/input";
import Select from "@/components/select";
import avatar from "/image/Avatar.jpg";
import { useAuthStore } from "@/store/auth";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useEditProfile, usePostUploadImages } from "@/api/hooks/useAuth";
import { LoadingPopUp } from "@/layout/loading";
import ProfilePictureRandom from "@/components/ui/profile-picture-random";

const Profile = () => {
  const { auth } = useAuthStore();
  const { mutateAsync } = useEditProfile();
  const { mutate: Upload, isPending: isUploadingImage } = usePostUploadImages();

  const [fullName, setFullName] = useState({ value: auth?.user?.fullName || "" });
  const [email, setEmail] = useState({ value: auth?.user?.email || "" });
  const [phone, setPhone] = useState({ value: auth?.user?.phone || "" });
  const [country, setCountry] = useState({ value: auth?.user?.country || "" });
  const [gender, setGender] = useState({ value: auth?.user?.gender || "" });
  const [address, setAddress] = useState({ value: auth?.user?.address || "" });
  const [zipCode, setZipCode] = useState({ value: auth?.user?.postalCode || "" });
  const [dob, setDob] = useState({ value: auth?.user?.dateOfBirth || "" });
  const [loadingEdit, setLoadingEdit] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [avatarPreview, setAvatarPreview] = useState(auth?.user?.avatar || avatar);
  // Convert ISO string to YYYY-MM-DD
  const formatDateForInput = (isoString?: string) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const GenderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingEdit(true);
      await mutateAsync({
        fullName: fullName.value,
        country: country.value,
        phone: phone.value,
        avatar: avatarPreview,
        dateOfBirth: dob.value,
        address: address.value,
        postalCode: zipCode.value,
        gender: gender.value,
      });
    } finally {
      setLoadingEdit(false);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      setFullName({ value: auth.user.fullName || "" });
      setAvatarPreview(auth?.user?.avatar || avatar);
      setEmail({ value: auth.user.email || "" });
      setPhone({ value: auth.user.phone || "" });
      setCountry({ value: auth.user.country || "" });
      setAddress({ value: auth.user.address || "" });
      setZipCode({ value: auth.user.postalCode || "" });
      setDob({ value: formatDateForInput(auth.user.dateOfBirth) });
      setGender({ value: auth.user.gender || "" });
    }
  }, [auth?.user]);

  const discardChanges = () => {
    if (auth?.user) {
      setFullName({ value: auth.user.fullName || "" });
      setEmail({ value: auth.user.email || "" });
      setPhone({ value: auth.user.phone || "" });
      setCountry({ value: auth.user.country || "" });
      setAddress({ value: auth.user.address || "" });
      setZipCode({ value: auth.user.postalCode || "" });
      setDob({ value: auth.user.dateOfBirth || "" });
      setGender({ value: auth.user.gender || "" });
      setAvatarPreview(auth.user.avatar || avatar);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Upload(
      { files: file, type: "profile" },
      {
        onSuccess: (res) => {
          const newImageUrl = res.data.uploads[0].url;
          setAvatarPreview(newImageUrl);
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full">
      {loadingEdit && <LoadingPopUp />}
      {/* MY PROFILE  */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-light px-4 py-4 md:flex-row md:items-center md:px-6 md:py-6 lg:ml-4">
        <div className="flex items-center justify-normal gap-3">
          <div className="relative aspect-square size-24">
            {avatarPreview ? (
              <img src={avatarPreview} className="size-24 rounded-full object-cover" />
            ) : (
              <ProfilePictureRandom className="!size-24" />
            )}
            {isUploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                <Icon icon="eos-icons:loading" className="size-8 text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-textcolor text-2xl font-bold">My Profile</h2>
            <p className="font-medium text-grey">
              Real-time information and activities of your prototype.
            </p>
          </div>
        </div>
        <label
          htmlFor="avatar-upload"
          className={`flex items-center justify-end gap-2 ${
            isUploadingImage
              ? "cursor-not-allowed text-grey"
              : "cursor-pointer text-grey hover:text-dark/25"
          }`}
        >
          <Icon icon="f7:camera" className="size-4" />
          <p className="font-medium">{isUploadingImage ? "Uploading..." : "Edit"}</p>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploadingImage}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* PROFILE FORM SECTION  */}
      <div className="">
        <form
          className="mt-4 flex min-h-screen flex-col rounded-2xl bg-light px-4 py-8 md:px-6 lg:ml-4"
          onSubmit={editProfile}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="font-semibold text-dark">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                state={fullName}
                setState={setFullName}
                icon={<Icon icon="mingcute:user-2-line" className="text-grey" fontSize={22} />}
                placeholder="e.g John Doe"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold text-dark">
                Email
              </label>
              <Input
                type="text"
                name="email"
                state={email}
                setState={setEmail}
                icon={<Icon icon="majesticons:mail-line" className="text-grey" fontSize={22} />}
                placeholder="Enter your email address"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="font-semibold text-dark">
                Phone Number
              </label>
              <PhoneInput
                country={"ng"}
                placeholder="Phone Number"
                value={phone.value}
                onChange={(phone) => setPhone({ value: phone })}
                inputClass="!w-full !bg-transparent !h-[2.65rem] border-2 "
                buttonClass="!bg-transparent !shadow-none !rounded-r-none !rounded-l-md"
                containerClass="!rounded-lg border-[1px]  w-full !bg-transparent !outline-none"
              />
            </div>
            {/* <div className="flex w-full items-center justify-normal gap-2"> */}
            <div className="flex flex-col gap-1">
              <label htmlFor="gender" className="font-semibold text-dark">
                Gender
              </label>
              <Select
                name="gender"
                state={gender}
                placeholder={`Select Gender`}
                setState={setGender}
                options={GenderOptions}
                className="border-[1.5px] border-neutral-300 py-[9.5px] pr-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="dateOfBirth" className="font-semibold text-dark">
                Date of Birth
              </label>
              <Input
                type="date"
                name="dob"
                max={today}
                state={dob}
                setState={setDob}
                icon={<Icon icon="bi:calendar2-date" className="text-2xl text-grey" />}
                placeholder="Date Of Birth"
                className="!block min-w-[95%] appearance-auto"
              />
            </div>
            {/*  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="font-semibold text-dark">
                Country
              </label>
              <CountrySelect
                value={country.value}
                onChange={(e) => setCountry({ value: e.target.value })}
                className="!h-[2.65rem] rounded-md border-[1.5px] border-neutral-300 px-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="font-semibold text-text">
                Address
              </label>
              <Input
                type="text"
                name="address"
                state={address}
                setState={setAddress}
                icon={<Icon icon="icon-park-outline:address-book" className="text-2xl text-grey" />}
                placeholder="123 Main Street, Spring"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="zipCode" className="font-semibold text-text">
                Zip Code
              </label>
              <Input
                type="text"
                name="zipCode"
                state={zipCode}
                setState={setZipCode}
                icon={<Icon icon="line-md:map-marker-radius" className="text-2xl text-grey" />}
                placeholder="112334"
              />
            </div>
          </div>
          <div className="mt-10 flex items-center justify-end gap-2 md:mt-28">
            <button
              className="btn w-auto rounded-lg border-[1px] border-dark px-8 py-[6px]"
              type="button"
              onClick={discardChanges}
            >
              Discard
            </button>
            <button className="btn-white w-auto rounded-lg py-[6px]" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
