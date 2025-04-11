import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/apiService';

const PendaftarContext = createContext();

// Helper untuk ubah tanggal ISO ke format "yyyy-MM-dd"
const formatDateForApi = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // hasil: "2002-02-01"
};

export const PendaftarProvider = ({ children }) => {
  const [pendaftars, setPendaftars] = useState([]);

  const fetchPendaftars = async () => {
    try {
      const res = await api.get('/pendaftar');
      const data = res.data.data.map(p => ({
        ...p,
        tanggal_lahir: formatDateForApi(p.tanggal_lahir)
      }));
      setPendaftars(data);
    } catch (error) {
      console.error('Gagal fetch data:', error);
    }
  };

  const addPendaftar = async (pendaftarData) => {
    try {
      const formattedData = {
        ...pendaftarData,
        tanggal_lahir: formatDateForApi(pendaftarData.tanggal_lahir)
      };

      const response = await api.post('/pendaftar', formattedData);
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

  const updatePendaftar = async (id, updatedFields) => {
    try {
      const existing = pendaftars.find(p => p.id_pendaftar === id);
      if (!existing) throw new Error('Data pendaftar tidak ditemukan');

      // Gabungkan data lama + data baru
      const mergedData = {
        ...existing,
        ...updatedFields,
      };

      const formattedData = {
        ...mergedData,
        tanggal_lahir: formatDateForApi(mergedData.tanggal_lahir)
      };

      const response = await api.put(`/pendaftar/${id}`, formattedData);

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
