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
  const goRoom = () => {
    router.push(PATH_PAGE.room);
  };
  // ログアウト
  const logout = () => {
    signOut();
    router.push(PATH_PAGE.login);
  };

  return (
    user && (
      <header className="flex w-full items-center justify-between bg-service-primary-background px-6 py-4 text-service-primary-text shadow-lg">
        {/* Logo */}
        <button onClick={goRoom} className="flex items-center">
          <img src="/image/Icon.png" alt="Logo" className="mr-2 h-12 w-12" />
          <h1 className="text-lg font-bold text-service-primary-text">E-Party</h1>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
            <img
              src={user.imageUrl}
              alt="User Avatar"
              className="h-12 w-12 rounded-full border-2 border-service-stroke"
            />
            <div className="ml-2">{user.name}</div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-service-primary-background shadow-lg">
              <ul className="py-1">
                <li className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={logout}>
                  ログアウト
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
