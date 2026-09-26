import profile1 from "/icons/Memoji-01.png";
import profile2 from "/icons/Memoji-02.png";
import profile26 from "/icons/Memoji-26.png";
import { useEffect, useState } from "react";

type prop = {
  src?: string;
  className?: string;
};

export default function ProfilePictureRandom({ className, src }: prop) {
  const [avatar, setAvatar] = useState(src);
  const profiles = [profile1, profile2, profile26];

  useEffect(() => {
    if (!src) {
      const number = Math.floor(Math.random() * profiles.length);
      setAvatar(profiles[number]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <img className={`w-11 rounded-full bg-primary ${className}`} src={avatar} alt="avatar" />;
}
