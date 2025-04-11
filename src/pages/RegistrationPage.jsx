import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePendaftar } from '../context/PendaftarContext';
import { Container, Row, Col, Form, Button as BsButton, Card, Alert as BsAlert } from 'react-bootstrap';
import Button from '../components/Common/Button';
import Alert from '../components/Common/Allert';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    nm_pendaftar: '',
    alamat: '',
    jenis_kelamin: 'Laki-laki',
    no_hp: '',
    asal_sekolah: '',
    jurusan: '',
    tgl_lahir: '',
    nisn: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addPendaftar } = usePendaftar();
  const navigate = useNavigate();
  
  const jurusanOptions = ['Rekayasa Perangkat Lunak', 'Multimedia', 'Akuntansi', 'Administrasi Perkantoran', 'Menjahit'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isTomorrow = (dateStr) => {
    const inputDate = new Date(dateStr);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      inputDate.getDate() === tomorrow.getDate() &&
      inputDate.getMonth() === tomorrow.getMonth() &&
      inputDate.getFullYear() === tomorrow.getFullYear()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { nm_pendaftar, alamat, no_hp, asal_sekolah, tgl_lahir, nisn } = formData;

    // Validasi wajib isi
    if (!nm_pendaftar || !alamat || !no_hp || !asal_sekolah || !tgl_lahir || !nisn) {
      setError('Harap isi semua field yang wajib diisi');
      setIsSubmitting(false);
      return;
    }

    // Validasi nama tidak boleh ada angka
    if (/\d/.test(nm_pendaftar)) {
      setError('Nama tidak boleh mengandung angka');
      setIsSubmitting(false);
      return;
    }

    // Tanggal lahir tidak boleh hari besok
    if (isTomorrow(tgl_lahir)) {
      setError('Tanggal lahir tidak boleh diisi dengan hari besok');
      setIsSubmitting(false);
      return;
    }

    // No HP tidak boleh mengandung huruf
    if (!/^\d+$/.test(no_hp)) {
      setError('Nomor HP tidak boleh mengandung huruf atau karakter lain');
      setIsSubmitting(false);
      return;
    }

    // NISN harus 10 digit angka
    if (!/^\d{10}$/.test(nisn)) {
      setError('NISN harus terdiri dari 10 digit angka');
      setIsSubmitting(false);
      return;
    }

    // Cek jika no_hp dan nisn sama
    if (no_hp === nisn) {
      setError('Nomor HP dan NISN tidak boleh sama');
      setIsSubmitting(false);
      return;
    }

    try {
      await addPendaftar(formData);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan data. Pastikan NISN dan No HP belum terdaftar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="text-success">Pendaftaran Berhasil!</Card.Title>
                <Card.Text>
                  Terima kasih telah mendaftar di sekolah kami. Data Anda telah tersimpan dan akan segera kami proses.
                </Card.Text>
                <Card.Text className="text-muted">
                  Anda akan diarahkan ke halaman utama dalam beberapa detik...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Formulir Pendaftaran PPDB</h2>

              {error && <BsAlert variant="danger" dismissible onClose={() => setError('')}>{error}</BsAlert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Lengkap*</Form.Label>
                  <Form.Control
                    type="text"
                    name="nm_pendaftar"
                    value={formData.nm_pendaftar}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Alamat Lengkap*</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Form.Select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nomor HP/WhatsApp*</Form.Label>
                      <Form.Control
                        type="tel"
                        name="no_hp"
                        value={formData.no_hp}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Asal Sekolah*</Form.Label>
                      <Form.Control
                        type="text"
                        name="asal_sekolah"
                        value={formData.asal_sekolah}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Jurusan yang Dipilih</Form.Label>
                      <Form.Select name="jurusan" value={formData.jurusan} onChange={handleChange}>
                        <option value="">Pilih Jurusan</option>
                        {jurusanOptions.map(jurusan => (
                          <option key={jurusan} value={jurusan}>{jurusan}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tanggal Lahir*</Form.Label>
                      <Form.Control
                        type="date"
                        name="tgl_lahir"
                        value={formData.tgl_lahir}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>NISN*</Form.Label>
                      <Form.Control
                        type="text"
                        name="nisn"
                        value={formData.nisn}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Mengirim...' : 'Daftar Sekarang'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;
