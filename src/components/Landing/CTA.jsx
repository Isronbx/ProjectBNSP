import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section style={{ backgroundColor: '#ebf4ff', padding: '4rem 0' }}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h2 className="fw-bold display-5 mb-4">Siap Bergabung dengan Kami?</h2>
            <p className="fs-5 mb-5">
              Jangan lewatkan kesempatan untuk menjadi bagian dari sekolah unggulan kami.
              Daftar sekarang sebelum kuota penuh!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register')}
            >
              Daftar Sekarang
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTA;
