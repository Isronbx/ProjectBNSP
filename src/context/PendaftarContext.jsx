import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/apiService';

const PendaftarContext = createContext();

export const PendaftarProvider = ({ children }) => {
  const [pendaftars, setPendaftars] = useState([]);

  const fetchPendaftars = async () => {
    try {
      const res = await api.get('/pendaftar');
      setPendaftars(res.data.data); 
    } catch (error) {
      console.error('Gagal fetch data:', error);
    }
  };

  const addPendaftar = async (pendaftarData) => {
    try {
      const response = await api.post('/pendaftar', pendaftarData);
      if (response?.data) {
        setPendaftars(prev => Array.isArray(prev) ? [...prev, response.data] : [response.data]);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error detail:', error.response.data);
      } else {
        console.error('Unknown error:', error);
      }
      throw error;
    }
  };

  const updatePendaftar = async (id, pendaftarData) => {
    try {
      const response = await api.put(`/pendaftar/${id}`, pendaftarData);
      if (response?.data) {
        setPendaftars(prev =>
          Array.isArray(prev)
            ? prev.map(p => (p.id_pendaftar === id ? response.data : p))
            : []
        );
      }
    } catch (error) {
      console.error('Error updating pendaftar:', error);
      throw error;
    }
  };

  const deletePendaftar = async (id) => {
    try {
      await api.delete(`/pendaftar/${id}`);
      setPendaftars(prev =>
        Array.isArray(prev)
          ? prev.filter(p => p.id_pendaftar !== id)
          : []
      );
    } catch (error) {
      console.error('Error deleting pendaftar:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPendaftars();
  }, []);

  return (
    <PendaftarContext.Provider
      value={{
        pendaftars,
        fetchPendaftars,
        addPendaftar,
        updatePendaftar,
        deletePendaftar
      }}
    >
      {children}
    </PendaftarContext.Provider>
  );
};

export const usePendaftar = () => useContext(PendaftarContext);
