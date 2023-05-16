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
      <div className="navbar-center">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            Dynamická paralaxa
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button
                data-toggle-theme="light,halloween"
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
