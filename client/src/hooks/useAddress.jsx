// client/src/hooks/useAddress.js
import { useContext } from 'react';
import AddressContext from '../context/addressContext';

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
