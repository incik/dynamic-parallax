import { FC } from "react";

export type HeaderProps = {
  toggleTheme: () => void;
};

export const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <div className="navbar bg-base-100 mb-2">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Dynamická paralaxa</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Konstanty</a>
          </li>
          <li>
            <button onClick={() => toggleTheme()}>☀️ / 🌗</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
