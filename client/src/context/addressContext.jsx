// client/src/context/addressContext.jsx
import React, { createContext, useContext, useState } from 'react';
import {
  upsertAddressApi,
  getAddressApi,
  deleteAddressApi
} from '../server/AddressApi.jsx';
import { UserContext } from './userContext.jsx';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the current user's address
  const fetchAddress = async () => {
    if (!user?.id) throw new Error('User is not logged in');
    setLoading(true);
    setError(null);
    try {
      const addr = await getAddressApi();
      setAddress(addr);
      return addr;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create or update within 24h
  const upsertAddress = async (addressData) => {
    if (!user?.id) throw new Error('User is not logged in');
    setLoading(true);
    setError(null);
    try {
      const addr = await upsertAddressApi(addressData);
      setAddress(addr);
      return addr;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete the address
  const deleteAddress = async () => {
    if (!user?.id) throw new Error('User is not logged in');
    setLoading(true);
    setError(null);
    try {
      await deleteAddressApi();
      setAddress(null);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        address,
        loading,
        error,
        fetchAddress,
        upsertAddress,
        deleteAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return ctx;
};

export default AddressContext;
