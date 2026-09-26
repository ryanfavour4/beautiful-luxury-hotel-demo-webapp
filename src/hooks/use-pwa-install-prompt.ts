import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("beforeinstallprompt", handler as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("beforeinstallprompt", handler as any);
    };
  }, []);

  const promptInstall = async () => {
    toast(
      "If on an iOS devices, to install PWA app please use Safari and tap the share button then 'add to home screen'",
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((deferredPrompt as any)?.prompt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (deferredPrompt as any).prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (deferredPrompt as any).userChoice;
      console.log("User choice", result);
      setDeferredPrompt(null); // Only allow it once
      setIsInstallable(false);
    } else {
      // check if it is ios and tell users it cannot be installed
      // if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      //   toast(
      //     "Cannot install on iOS devices, to use as an app please use Safari and tap the share button then 'add to home screen'",
      //   );
      //   return;
      // }

      toast("Already installed");
    }
  };

  return { isInstallable, promptInstall };
}
