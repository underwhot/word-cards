import styles from './Button.module.css';

const Button = ({ onClick, children, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;
