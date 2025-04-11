import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';

const About = () => {
  const fasilitas = [
    'Lab Komputer',
    'Perpustakaan',
    'Lapangan Olahraga',
    'Lab Bahasa',
    'Aula Serbaguna',
    'Ruang Musik',
  ];

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(to bottom, #e3f2fd, #ffffff)' }}>
      <Container>
        <h2 className="text-center fw-bold display-5 mb-5 text-primary">Tentang Sekolah Kami</h2>
        <Row className="align-items-center g-5">
          <Col md={6}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <Card.Title className="fs-3 fw-semibold text-dark mb-3">Visi</Card.Title>
                <Card.Text className="text-muted">
                  Menjadi sekolah unggulan yang menghasilkan generasi berkarakter, berprestasi, dan berdaya saing global.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-3 fw-semibold text-dark mb-3">Misi</Card.Title>
                <ul className="text-muted ps-3 mb-0">
                  <li className="mb-2">Menyelenggarakan pendidikan berkualitas dengan pendekatan holistik</li>
                  <li className="mb-2">Mengembangkan potensi peserta didik secara optimal</li>
                  <li className="mb-2">Membentuk karakter peserta didik yang berakhlak mulia</li>
                  <li>Menyiapkan peserta didik untuk menghadapi tantangan global</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow border-0">
              <Card.Body>
                <Card.Title className="fs-3 fw-semibold text-dark mb-4">Fasilitas Sekolah</Card.Title>
                <Row xs={2} className="g-3">
                  {fasilitas.map((item, idx) => (
                    <Col key={idx}>
                      <div className="d-flex align-items-center">
                        <Badge bg="primary" className="me-2 px-2 py-1 rounded-circle">✓</Badge>
                        <span className="text-muted">{item}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
