import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container className="text-center">
        <p className="mb-1">© {new Date().getFullYear()} PPDB Sekolah. All rights reserved.</p>
        <p className="text-muted small mb-0">
          Sistem Penerimaan Peserta Didik Baru - Sekolah Kami
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
