import { NavLink } from 'react-router-dom';

export function Header() {
  const navClass = 'w-44 py-4 mx-6 duration-300';
  const activeClass = `bg-[#04DCCA] ${navClass}`;
  const normalClass = `bg-[#ECE5F0] hover:bg-gray-300 ${navClass}`;
  return (
    <header className="w-full bg-teal-900 m-md">
      <nav className="flex justify-between items-center text-lg text-center shadow-xl font-bold text-cyan-900">
        <NavLink
          to="/home"
          data-testid="link-to-search"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Home
        </NavLink>
        <NavLink
          to="/cats"
          data-testid="link-to-favorites"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Cats
        </NavLink>
        <NavLink
          to="/dogs"
          data-testid="link-to-profile"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Dogs
        </NavLink>
        <NavLink
          to="/customers"
          data-testid="link-to-profile"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Customers
        </NavLink>
      </nav>
    </header>
  );
}
