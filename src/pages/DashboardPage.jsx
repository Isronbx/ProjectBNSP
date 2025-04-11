import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DashboardLayout from '../components/Dashboard/DashboardLyout';
import PendaftarTable from '../components/Dashboard/PendaftarTable';
import PendaftarDetail from '../components/Dashboard/PendaftarDetail';
import PendaftarForm from '../components/Dashboard/PendaftarForm';

const DashboardPage = () => {
  const [view, setView] = useState('list'); 
  const [selectedPendaftar, setSelectedPendaftar] = useState(null);

  const handleViewDetail = (pendaftar) => {
    setSelectedPendaftar(pendaftar);
    setView('detail');
  };

  const handleAddNew = () => {
    setSelectedPendaftar(null);
    setView('add');
  };

  const handleEdit = (pendaftar) => {
    setSelectedPendaftar(pendaftar);
    setView('edit');
  };

  const handleBackToList = () => {
    setSelectedPendaftar(null);
    setView('list');
  };

  return (
    <DashboardLayout>
      <Container className="py-4">
        {view === 'list' && (
          <>
            <Row className="align-items-center mb-4">
              <Col>
                <h1 className="fw-bold fs-3 text-primary">Daftar Pendaftar PPDB</h1>
              </Col>
              <Col className="text-end">
                <Button variant="primary" onClick={handleAddNew}>
                  Tambah Pendaftar
                </Button>
              </Col>
            </Row>

            <PendaftarTable
              onViewDetail={handleViewDetail}
              onEdit={handleEdit}
            />
          </>
        )}

        {view === 'detail' && selectedPendaftar && (
          <PendaftarDetail
            pendaftar={selectedPendaftar}
            onBack={handleBackToList}
          />
        )}

        {(view === 'add' || view === 'edit') && (
          <PendaftarForm
            pendaftar={view === 'edit' ? selectedPendaftar : null}
            onSuccess={handleBackToList}
            onCancel={handleBackToList}
          />
        )}
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPage;
