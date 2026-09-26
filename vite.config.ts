import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      selfDestroying: true,
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      workbox: {
        navigateFallbackDenylist: [
          /^\/image\//,
          /^\/assets\//,
          /^\/icons\//,
          /^\/videos\//,
          /^\/public\//,
          /\.(?:png|jpg|jpeg|webp|svg|ico)$/,
        ],
        // Optional: Include images in SW precaching if you want offline support for them
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
      },
      manifest: {
        name: "Beautiful Luxury Hotel",
        short_name: "Beautiful Luxury Hotel",
        description:
          "Beautiful Luxury Hotel, Nigeria — where comfort meets elegance. Enjoy world-class suites, spa, fine dining, and unforgettable hospitality.",
        theme_color: "#CDA75C",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    allowedHosts: ["bd8e-2a09-bac5-4dea-6d2-00-ae-15.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "http://178.32.185.20:3001",
      },
    },
  },
});
