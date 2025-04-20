import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import NoChatSelected from "./NoChatSelected.jsx";
import ChatContainer from "./ChatContainer.jsx";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";

function HomePage() {
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    !authUser && navigate("/login");
  }, [navigate, authUser]);

  if(!authUser) {
    return (
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />

              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
