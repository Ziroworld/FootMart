// client/src/hooks/useUser.jsx
import { useContext } from 'react';
import { UserContext } from '../context/userContext.jsx';

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};
