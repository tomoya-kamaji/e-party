'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

type SnackbarType = 'success' | 'error' | 'info';

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  duration?: number;
}

interface SnackbarContextProps {
  showSnackbar: (message: string, type: SnackbarType, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);

  const showSnackbar = useCallback((message: string, type: SnackbarType, duration = 3000) => {
    setSnackbar({ message, type, duration });
    setTimeout(() => setSnackbar(null), duration);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <div
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded px-4 py-2 text-white shadow-lg ${
            snackbar.type === 'success' ? 'bg-green-500' : snackbar.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
