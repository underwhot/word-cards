const Button = ({ onClick, children, type, className }) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={className ? 'btn ' + className : 'btn'}
    >
      {children}
    </button>
  );
};

export default Button;
