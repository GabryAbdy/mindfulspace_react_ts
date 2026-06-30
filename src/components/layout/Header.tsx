import { NavLink } from "react-router";

export default function Header() {
  return (
    <nav className="flex justify-center my-1">
      <ul className="flex gap-2">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/meditate">Meditate</NavLink>
        </li>
        <li>
          <NavLink to="/sounds">Sounds</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}

// CHIEDI A CLAUDE SE  POSSO CAMBIARE nav CON NavLink
