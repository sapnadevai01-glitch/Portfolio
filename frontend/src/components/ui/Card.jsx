const Card = ({ children, className = '', hover = false, glass = false, ...props }) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-white dark:bg-dark-card shadow-lg',
    glass: 'glass backdrop-blur-lg',
    flat: 'bg-gray-100 dark:bg-dark-surface'
  };

  return (
    <div
      className={`${baseStyles} ${variants.default} ${glass ? 'glass' : ''} ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
