import { Card, Row, Col, Badge } from 'react-bootstrap';
import Button from '../Common/Button';

const PendaftarDetail = ({ pendaftar, onBack }) => {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h2 className="h4 fw-bold">Detail Pendaftar</h2>
          <Button variant="secondary" onClick={onBack}>
            Kembali
          </Button>
        </div>

        <Row>
          <Col md={6}>
            <div className="mb-4">
              <h5 className="text-muted fw-semibold">Informasi Pribadi</h5>
              <div className="mt-2">
                <p><strong>Nama Lengkap:</strong> {pendaftar?.nm_pendaftar || '—'}</p>
                <p><strong>Jenis Kelamin:</strong> {pendaftar?.jenis_kelamin || '—'}</p>
                <p><strong>Tanggal Lahir:</strong> {pendaftar?.tgl_lahir || '—'}</p>
                <p><strong>NISN:</strong> {pendaftar?.nisn || '—'}</p>
              </div>
            </div>

            <div>
              <h5 className="text-muted fw-semibold">Kontak</h5>
              <div className="mt-2">
                <p><strong>Alamat:</strong> {pendaftar?.alamat || '—'}</p>
                <p><strong>No. HP:</strong> {pendaftar?.no_hp || '—'}</p>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-4">
              <h5 className="text-muted fw-semibold">Informasi Sekolah</h5>
              <div className="mt-2">
                <p><strong>Asal Sekolah:</strong> {pendaftar?.asal_sekolah || '—'}</p>
                <p><strong>Jurusan:</strong> {pendaftar?.jurusan || '—'}</p>
              </div>
            </div>

            <div>
              <h5 className="text-muted fw-semibold">Status Pendaftaran</h5>
              <div className="mt-2">
                <Badge bg="warning" text="dark" className="px-3 py-2">
                  Menunggu Verifikasi
                </Badge>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PendaftarDetail;
