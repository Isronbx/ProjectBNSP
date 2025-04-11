import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <h1 className="display-1 fw-bold text-dark mb-3">404</h1>
          <p className="lead text-muted mb-4">Halaman yang Anda cari tidak ditemukan.</p>
          <Button variant="primary" size="lg" onClick={handleBack}>
            Kembali ke Halaman Sebelumnya
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
