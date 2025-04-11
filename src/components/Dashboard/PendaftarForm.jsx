import { useState } from 'react';
import { Form, Row, Col, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { usePendaftar } from '../../context/PendaftarContext';

const PendaftarForm = ({ pendaftar, onSuccess, onCancel }) => {
  const isEditMode = !!pendaftar;
  const { addPendaftar, updatePendaftar, pendaftars } = usePendaftar();

  const [formData, setFormData] = useState({
    nm_pendaftar: pendaftar?.nm_pendaftar || '',
    alamat: pendaftar?.alamat || '',
    jenis_kelamin: pendaftar?.jenis_kelamin || 'Laki-laki',
    no_hp: pendaftar?.no_hp || '',
    asal_sekolah: pendaftar?.asal_sekolah || '',
    jurusan: pendaftar?.jurusan || '',
    tgl_lahir: pendaftar?.tgl_lahir || '',
    nisn: pendaftar?.nisn || ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jurusanOptions = ['Rekayasa Perangkat Lunak', 'Multimedia', 'Akuntansi', 'Administrasi Perkantoran', 'Menjahit'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { nm_pendaftar, no_hp, nisn, tgl_lahir } = formData;

    // Validasi nama tidak mengandung angka
    if (nm_pendaftar && /\d/.test(nm_pendaftar)) {
      setError('Nama tidak boleh mengandung angka.');
      return false;
    }

    // Validasi no_hp hanya angka
    if (no_hp && !/^\d+$/.test(no_hp)) {
      setError('Nomor HP hanya boleh berisi angka.');
      return false;
    }

    // Validasi tanggal lahir tidak boleh lebih dari hari ini
    if (tgl_lahir) {
      const inputDate = new Date(tgl_lahir);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (inputDate > tomorrow) {
        setError('Tanggal lahir tidak boleh lebih dari hari ini.');
        return false;
      }
    }

    // Validasi NISN harus 10 digit angka
    if (nisn && !/^\d{10}$/.test(nisn)) {
      setError('NISN harus terdiri dari 10 digit angka.');
      return false;
    }

    // Validasi no_hp 10–13 digit angka
    if (no_hp && !/^\d{10,13}$/.test(no_hp)) {
      setError('Nomor HP harus terdiri dari 10-13 digit angka.');
      return false;
    }

    // Validasi duplikasi NISN dan No HP
    if (Array.isArray(pendaftars)) {
      const isDuplicate = pendaftars.some(p =>
        (!isEditMode || p.id_pendaftar !== pendaftar?.id_pendaftar) &&
        (p.nisn === nisn || p.no_hp === no_hp)
      );

      if (isDuplicate) {
        setError('NISN atau Nomor HP sudah terdaftar.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updatePendaftar(pendaftar.id_pendaftar, formData);
        setSuccess('Data berhasil diperbarui.');
      } else {
        await addPendaftar(formData);
        setSuccess('Data berhasil ditambahkan.');
        setFormData({
          nm_pendaftar: '', alamat: '', jenis_kelamin: 'Laki-laki',
          no_hp: '', asal_sekolah: '', jurusan: '', tgl_lahir: '', nisn: ''
        });
      }
      onSuccess();
    } catch {
      setError('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h2 className="mb-4 fw-bold">
          {isEditMode ? 'Edit Pendaftar' : 'Tambah Pendaftar Baru'}
        </h2>

        {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              type="text"
              name="nm_pendaftar"
              value={formData.nm_pendaftar}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alamat Lengkap</Form.Label>
            <Form.Control
              as="textarea"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nomor HP / WhatsApp</Form.Label>
                <Form.Control
                  type="tel"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Asal Sekolah</Form.Label>
                <Form.Control
                  type="text"
                  name="asal_sekolah"
                  value={formData.asal_sekolah}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Jurusan yang Dipilih</Form.Label>
                <Form.Select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                >
                  <option value="">Pilih Jurusan</option>
                  {jurusanOptions.map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tgl_lahir"
                  value={formData.tgl_lahir}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>NISN</Form.Label>
                <Form.Control
                  type="text"
                  name="nisn"
                  value={formData.nisn}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? <><Spinner animation="border" size="sm" /> Menyimpan...</> : 'Simpan'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PendaftarForm;
