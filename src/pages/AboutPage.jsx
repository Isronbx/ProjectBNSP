import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center fw-bold display-5 mb-5 text-primary">Tentang PPDB Sekolah Kami</h1>

      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fs-4 fw-semibold text-primary mb-3">Sejarah Sekolah</Card.Title>
              <Card.Text className="text-muted">
                Sekolah kami didirikan pada tahun <strong>1985</strong> dengan visi untuk memberikan pendidikan berkualitas kepada masyarakat. 
                Selama lebih dari 30 tahun, kami telah menghasilkan lulusan yang berprestasi di berbagai bidang.
              </Card.Text>
              <Card.Text className="text-muted">
                Dengan fasilitas yang terus diperbarui dan kurikulum yang selalu disesuaikan dengan perkembangan zaman, 
                kami berkomitmen untuk memberikan yang terbaik bagi peserta didik.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fs-4 fw-semibold text-primary mb-3">Profil Guru</Card.Title>
              <Card.Text className="text-muted">
                Kami memiliki tenaga pendidik yang profesional dan berpengalaman di bidangnya masing-masing. 
                Lebih dari <strong>80%</strong> guru kami memiliki kualifikasi S2 dan telah mengikuti berbagai pelatihan pengembangan profesional.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fs-4 fw-semibold text-primary mb-3 text-center">Prestasi Sekolah</Card.Title>
              <ul className="text-muted ps-3">
                <li className="mb-2">Sekolah Adiwiyata Nasional 2020</li>
                <li className="mb-2">Juara 1 Lomba Sains Tingkat Provinsi 2021</li>
                <li className="mb-2">Sekolah dengan Nilai UN Tertinggi se-Kota 2022</li>
                <li className="mb-2">Juara Umum Olimpiade Matematika Regional 2023</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        <Link to="/register">
          <Button variant="primary" size="lg">
            Daftar Sekarang
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default AboutPage;
