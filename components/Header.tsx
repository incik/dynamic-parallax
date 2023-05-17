import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Logo } from "./Logo";

export const Header = () => {
  useEffect(() => {
    themeChange(false);
    return () => {
      themeChange(false);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 mb-2 shadow-sm">
      <div className="navbar-start">
        <Logo />
      </div>
      <div className="text-center">
        <div className="flex-1 md:whitespace-nowrap">
          <span className="font-bold break-words sm:break-keep text-sm sm:text-xl ">
            Dynamická paralaxa
          </span>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button
                data-toggle-theme="halloween,light"
                data-act-class="ACTIVECLASS"
              >
                ☀️ / 🌗
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
