'use client';

import { useAuth } from '@/state/AuthContext';
import { PATH_PAGE } from '@/util/route';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * ヘッダー
 */
const Header = () => {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const router = useRouter();
  // ホームに戻るためのアクション
  const goHome = () => {
    router.push(PATH_PAGE.home);
  };

  return (
    user && (
      <header className="bg-service-primary-background text-service-primary-text flex w-full items-center justify-between px-6 py-4 shadow-lg">
        {/* Logo */}
        <button onClick={goHome} className="flex items-center">
          <img src="/image/Icon.png" alt="Logo" className="mr-2 h-12 w-12" />
          <h1 className="text-service-primary-text text-lg font-bold">E-Party</h1>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
            <img
              src={user.imageUrl}
              alt="User Avatar"
              className="border-service-stroke h-8 w-8 rounded-full border-2"
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="bg-service-primary-background absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg">
              <ul className="py-1">
                <li className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={signOut}>
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
