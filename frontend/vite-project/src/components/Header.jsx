import { useAuthStore } from "../store/useAuthStore.js";
import { LogOut, User, Settings2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const { authUser, logout } = useAuthStore();
  return (
    <>
      <header className="fixed top-0 z-10 navbar bg-base-100 shadow-sm">
        <Link to="/" className="flex-1">
          <div className="flex items-center gap-2 pl-2">
            <div className="size-7 rounded-xl  flex items-center justify-center bg-primary/10">
              <MessageSquare className="size-7 text-primary" />
            </div>
            <p className="font-bold text-xl">Blabber</p>
          </div>
        </Link>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to={"/settings"}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={"Settings"}
              >
                <div className="inset-y-0 flex items-center">
                  <Settings2 className="size-5" />
                </div>
                <span className="hidden lg:block">Settings</span>
              </Link>
            </li>
            {authUser && (
              <li>
                <Link
                  to={"/profile"}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={"Profile"}
                >
                  <div className="inset-y-0 flex items-center">
                    <User className="size-5" />
                  </div>
                  <span className="hidden lg:block">Profile</span>
                </Link>
              </li>
            )}
            {authUser && (
              <li>
                <div onClick={logout} data-tooltip-id="my-tooltip"
                  data-tooltip-content={"Logout"}>
                  <div className="inset-y-0 flex items-center">
                    <LogOut className="size-5" />
                  </div>
                  <a className="hidden lg:block">
                    Logout
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
