import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#ff7f11] hover:bg-[#ff7f11]/90 text-white focus:ring-[#ff7f11]/50',
    secondary: 'bg-[#beb7a4] hover:bg-[#beb7a4]/90 text-black focus:ring-[#beb7a4]/50',
    outline: 'border border-[#ff7f11] text-[#ff7f11] hover:bg-[#ff7f11]/10 focus:ring-[#ff7f11]/50',
    text: 'text-[#ff7f11] hover:bg-[#ff7f11]/10 focus:ring-[#ff7f11]/50',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;