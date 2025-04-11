import { Alert as BootstrapAlert } from 'react-bootstrap';
import {
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertProps = {
    info: {
      variant: 'info',
      icon: <FiInfo className="me-2" />,
    },
    success: {
      variant: 'success',
      icon: <FiCheckCircle className="me-2" />,
    },
    warning: {
      variant: 'warning',
      icon: <FiAlertTriangle className="me-2" />,
    },
    error: {
      variant: 'danger',
      icon: <FiXCircle className="me-2" />,
    },
  };

  const { variant, icon } = alertProps[type] || alertProps.info;

  return (
    <BootstrapAlert
      variant={variant}
      dismissible={!!onClose}
      onClose={onClose}
      className="d-flex align-items-center shadow-sm rounded-3"
    >
      {icon}
      <div className="flex-grow-1">{message}</div>
    </BootstrapAlert>
  );
};

export default Alert;
