import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  disabled = false,
  size = 'md',
}) => {
  return (
    <BootstrapButton
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className={className}
      size={size}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;
