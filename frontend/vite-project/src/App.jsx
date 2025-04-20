import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log("Online Users: ", onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <>
        <div className="flex h-screen justify-center items-center">
          <Loader className="size-10 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <div data-theme={theme}>
        <Header />
        <Outlet />
        <Toaster />
        <Tooltip
          id="my-tooltip"
          className="!opacity-100 !rounded-lg !p-2"
          place="bottom"
        />
      </div>
    </>
  );
}

export default App;
