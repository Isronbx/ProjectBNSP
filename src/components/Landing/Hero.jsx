import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(to right,rgb(53, 253, 243), #2563eb)',
        color: '#fff',
        padding: '100px 0',
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={10}>
            <h1 className="fw-bold display-4 mb-4">
              Penerimaan Peserta Didik Baru
            </h1>
            <p className="lead mb-5">
              Selamat datang di sistem PPDB online Sekolah Kami. Daftarkan diri Anda sekarang untuk tahun ajaran baru.
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => (window.location.href = '/register')}
              >
                Daftar Sekarang
              </Button>
              <Button
                variant="light"
                size="lg"
                onClick={() => (window.location.href = '/about')}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
