import { createPortal } from "react-dom";

export default function PortalRoot({ children }: { children: React.ReactNode }) {
  const portalRoot = document.getElementById("portal");

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
}
