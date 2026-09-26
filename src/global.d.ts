declare module "tailwind-clip-path";

export declare global {
  interface Window {
    Tawk_API?: {
      maximize: () => void;
      minimize: () => void;
      hideWidget: () => void;
      showWidget: () => void;
      onLoad: () => void;
    };
  }
}
