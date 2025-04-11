import { useState, useEffect } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { usePendaftar } from '../../context/PendaftarContext';
import Loading from '../Common/Loading';
import Alert from '../Common/Allert';

const PendaftarTable = ({ onViewDetail, onEdit }) => {
  const { pendaftars, deletePendaftar, fetchPendaftars } = usePendaftar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchPendaftars();
       
      } catch (err) {
        setError('Gagal memuat data pendaftar');
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [fetchPendaftars]);
  

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pendaftar ini?')) {
      try {
        await deletePendaftar(id);
      } catch (err) {
        setError('Gagal menghapus pendaftar');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <Card className="shadow-sm border-0">
        <Card.Body>
          <h4 className="mb-4 fw-bold">Data Pendaftar</h4>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>No. HP</th>
                <th>Asal Sekolah</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pendaftars) && pendaftars.length > 0 ? (
                pendaftars.map((data, index) => (
                  <tr key={data.id || index}>
                    <td>{index + 1}</td>
                    <td>{data.nm_pendaftar}</td>
                    <td>{data.jenis_kelamin}</td>
                    <td>{data.no_hp}</td>
                    <td>{data.asal_sekolah}</td>
                    <td>{data.jurusan}</td>
                    <td>
                      <Button size="sm" variant="info" onClick={() => onViewDetail(data)}>
                        Detail
                      </Button>{' '}
                      <Button size="sm" variant="warning" onClick={() => onEdit(data)}>
                        Edit
                      </Button>{' '}
                      <Button size="sm" variant="danger" onClick={() => handleDelete(data.id_pendaftar)}>
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Tidak ada data pendaftar.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PendaftarTable;
