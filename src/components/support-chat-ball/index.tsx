import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import Logo from "@/components/logo/index";
import { Icon } from "@iconify/react";

export default function SupportChatBall({ disabledPages }: { disabledPages?: string[] }) {
  const { auth } = useAuthStore();
  const [showGreeting, setShowGreeting] = useState(true);
  const [position, setPosition] = useState<"right-10" | "left-10">("right-10");

  const handlers = useLongPress(() => {
    setPosition(position === "left-10" ? "right-10" : "left-10");
  });

  return (
    <>
      <button
        className={`fixed bottom-10 z-20 rounded-full bg-primary hover:animate-shake md:bottom-10 ${position} ${disabledPages?.includes(window.location.pathname) ? "hidden" : "block"}`}
        title="Press and Hold to Change Position"
        {...handlers()}
        onDoubleClick={() => setPosition(position === "left-10" ? "right-10" : "left-10")}
        onClick={() => window.Tawk_API?.maximize()}
      >
        {/* <div className="relative flex size-14 items-center justify-center rounded-full bg-light [box-shadow:inset_-5px_-5px_10px_rgb(var(--grey))]"> */}
        <div className="relative flex size-14 items-center justify-center rounded-full bg-light [box-shadow:inset_4px_4px_-6px_rgb(var(--grey))]">
          {/* Greeting bubble */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(!showGreeting);
            }}
            className={`absolute -top-14 z-10 rounded-full border border-error bg-light px-1 py-1 text-sm font-bold text-error md:-top-14 ${
              position === "left-10" ? "-left-4" : "-right-4"
            } ${showGreeting ? "block" : "hidden"}`}
          >
            <Icon icon={"material-symbols-light:close-rounded"} />
          </div>
          <div
            className={`absolute -top-9 min-w-28 text-nowrap border bg-light px-3 py-2 text-xs font-semibold text-primary shadow md:-top-10 ${
              position === "left-10"
                ? "left-0 rounded-br-2xl rounded-tl-2xl"
                : "right-0 rounded-bl-2xl rounded-tr-2xl"
            } ${showGreeting ? "block" : "hidden"}`}
          >
            👋 hello {auth ? auth?.user?.fullName?.split(" ")[0] : "there"}
          </div>

          {/* Centered Logo */}
          <Logo variant="default" className="h-7 w-7" />

          {/* Ping Circle */}
          <div className="absolute inset-0 scale-50 animate-ping rounded-full bg-primary" />
        </div>
      </button>

      {/* <button
        className={`fixed bottom-20 z-20 rounded-full bg-primary hover:animate-shake md:bottom-10 ${position}`}
        title="Press and Hold to Change Position"
        {...handlers()}
        onDoubleClick={() => setPosition(position === "left-10" ? "right-10" : "left-10")}
        onClick={() => window.Tawk_API?.maximize()}
      >
        <div className="relative inset-0 size-11 rounded-full bg-light">
          <div
            className={`absolute -top-8 min-w-28 text-nowrap rounded border border-text/25 px-2 py-1 text-xs text-dark md:-top-8 ${position === "left-10" ? "left-0" : "right-0"}`}
          >
            👋 hello {auth ? auth?.user?.fullName?.split(" ")[0] : "there"}
          </div>
          <div className="flex items-center justify-center text-center">
            <Logo variant="default" className="h-7 w-7" />
          </div>
          <div className="absolute inset-0 scale-50 animate-ping rounded-full bg-primary" />
        </div>
      </button> */}
    </>
  );
}
