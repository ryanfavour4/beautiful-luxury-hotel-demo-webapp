import "react-calendar/dist/Calendar.css";
import "swiper/swiper-bundle.css";
import "react-phone-input-2/lib/style.css";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import "@/styles/bg.css";
import "@/styles/libraries.css";
import "@/styles/calender.css";
import Router from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, useLocation } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/theme";
import { useEffect, useLayoutEffect, useState } from "react";
import SupportChatBall from "./components/support-chat-ball";
import ScrollToTop from "./components/scroll-to-top";
import { FoodListContextProvider } from "./components/foolist-context/foodlist-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed queries up to 1 times
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Prevent unnecessary refetching
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <FoodListContextProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Router />
              <Root />
            </BrowserRouter>
          </FoodListContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

function Root() {
  const location = useLocation();
  const [disabledPages, setDisabledPages] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (window?.Tawk_API) {
      window.Tawk_API.onLoad = function () {
        window?.Tawk_API?.hideWidget();
      };
    }
  }, []);

  useEffect(() => {
    if (
      location.pathname.startsWith("/reservations/details/") &&
      location.pathname.endsWith("/concierge")
    ) {
      setDisabledPages([
        ...disabledPages,
        `/reservations/details/${location.pathname.split("/")[3]}/concierge`,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <SupportChatBall disabledPages={disabledPages} />
      <Toaster />
    </>
  );
}
