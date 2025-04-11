import { Container, Row, Col, Card } from 'react-bootstrap';

const features = [
  {
    title: "Proses Pendaftaran Mudah",
    description: "Daftar kapan saja dan di mana saja melalui sistem online kami.",
    icon: "📝",
  },
  {
    title: "Informasi Real-time",
    description: "Pantau status pendaftaran Anda secara real-time.",
    icon: "🔄",
  },
  {
    title: "Biaya Terjangkau",
    description: "Biaya pendaftaran yang terjangkau dengan berbagai fasilitas.",
    icon: "💰",
  },
  {
    title: "Berkualitas",
    description: "Sekolah dengan standar pendidikan tinggi dan fasilitas lengkap.",
    icon: "🏆",
  },
];

const Features = () => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
      <Container>
        <h2 className="text-center fw-bold display-5 mb-5 text-primary">Keunggulan Kami</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="h-100 shadow-sm border-0 text-center p-3 hover-shadow">
                <div className="fs-1 mb-3">{feature.icon}</div>
                <Card.Title className="fw-semibold fs-5">{feature.title}</Card.Title>
                <Card.Text className="text-muted">{feature.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
