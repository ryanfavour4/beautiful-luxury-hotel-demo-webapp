import React from "react";

interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** If true, the switch and knob will have fully rounded corners */
  rounded?: boolean;
  /** Additional class names for the label wrapper */
  className?: string;
  name?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  rounded = true,
  className = "",
  name = "",
  ...props
}) => {
  return (
    <label className={`relative inline-block h-[34px] w-[60px] cursor-pointer ${className}`}>
      {/* Hidden checkbox */}
      <input id={name} name={name} type="checkbox" className="peer h-0 w-0 opacity-0" {...props} />

      {/* The slider background */}
      <span
        className={`bg-textcolor/25 absolute bottom-0 left-0 right-0 top-0 cursor-pointer border transition-colors duration-300 peer-checked:bg-primary/40 peer-focus:shadow-md ${rounded ? "rounded-full" : ""}`}
      />

      {/* The toggle knob */}
      <span
        className={`absolute bottom-[4px] left-[4px] h-[26px] w-[26px] bg-light transition-transform duration-300 ${rounded ? "rounded-full" : "rounded"} peer-checked:translate-x-[26px] peer-checked:bg-primary`}
      />
    </label>
  );
};

export default ToggleSwitch;
