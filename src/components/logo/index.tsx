import logo from "/svg/logo.svg";
import logoAlt from "/svg/logo-alt-1.svg";
import logoIcon from "/svg/logo.svg";

type prop = {
  className?: string;
  variant?: "default" | "alt" | "icon";
};

export default function Logo({ className, variant = "default" }: prop) {
  let logoSrc = logo;

  if (variant === "alt") {
    logoSrc = logoAlt;
  } else if (variant === "icon") {
    logoSrc = logoIcon;
  }

  return (
    <>
      <img alt="logo" src={logoSrc} className={`w-10 object-contain ${className}`} />
    </>
  );
}
