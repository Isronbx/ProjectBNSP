import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-primary text-white d-flex flex-column justify-content-between py-4 px-3">
          <div>
            <div className="mb-4 border-bottom pb-2">
              <h4 className="fw-bold">Admin Dashboard</h4>
              <small className="text-white-50">PPDB Sekolah</small>
            </div>

            <Nav className="flex-column">
              <Nav.Link as={Link} to="/dashboard" className="text-white px-3 py-2 rounded mb-2" activeclassname="active" style={{ backgroundColor: '#0d6efd20' }}>
                Dashboard
              </Nav.Link>
            </Nav>
          </div>

          <div className="border-top pt-3 d-flex align-items-center">
            <div
              className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center me-2"
              style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="mb-0 fw-semibold">{user?.email}</p>
              <Button
                variant="link"
                className="p-0 text-white-50 text-decoration-none"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="p-4">
          <Container fluid>
            {children}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardLayout;
