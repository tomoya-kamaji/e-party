type Variant = 'primary' | 'secondary' | 'danger' | 'default';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  onClick: () => void;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[#4398A9] text-white font-bold',
  secondary: 'border border-[#4398A9] text-[#4398A9] font-bold', // LINEを使用しないで始める
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  // デフォルト
  default: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
};

const sizeStyles: Record<Size, string> = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2 text-md',
  large: 'px-6 py-3 text-lg',
};

const Button = ({ variant = 'default', size = 'medium', children, className = '', onClick, ...props }: ButtonProps) => {
  const classes = `${variantStyles[variant]} ${sizeStyles[size]} rounded ${className}`;
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
