import { useState } from "react";
import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/meditate", label: "Meditate" },
  { to: "/sounds", label: "Sounds" },
  { to: "/settings", label: "Settings" },
];

function renderNavItems() {
  return links.map((link) => (
    <li key={link.to}>
      <NavLink to={link.to}>{link.label}</NavLink>
    </li>
  ));
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-grass-500">
      <div className=" flex items-center justify-between py-4">
        {/* Brand */}
        <NavLink to="/" className="font-bold px-4">
          mindfulspace
        </NavLink>

        {/* Desktop navigation menu */}
        <ul className="hidden md:flex px-4 gap-4">{renderNavItems()}</ul>

        {/* Burger button */}
        <button
          className="font-bold px-4 cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          =
        </button>
      </div>

      {/* Mobile navigation menu */}
      <ul
        className={`${isOpen ? "flex" : "hidden"} md:hidden flex-col justify-self-end items-end gap-2 px-4 pb-2`}
      >
        {renderNavItems()}
      </ul>
    </nav>
  );
}
