import { useAuth } from '@/state/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    user && (
      <header className="bg-background-dark text-white w-full px-6 py-4 flex justify-between items-center shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.svg" alt="Logo" className="h-6 w-6 mr-2" />
          <h1 className="text-lg font-bold">E-Party</h1>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
            <img src={user.imageUrl} alt="User Avatar" className="h-8 w-8 rounded-full border-2 border-white" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={signOut}>
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    )
  );
};

export default Header;
