import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'yellow' | 'blue' | 'secondary' | 'hover' | 'inactive';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  let baseStyles = "inline-flex items-center justify-center font-corpo font-medium text-sm px-5 py-2.5 rounded-full border border-marrom transition-all shadow-sm focus:outline-none";
  
  let variantStyles = "";
  if (disabled || variant === 'inactive') {
    variantStyles = "bg-creme/50 text-marrom/40 border-marrom/30 cursor-not-allowed shadow-none";
  } else {
    switch (variant) {
      case 'primary':
        variantStyles = "bg-marrom text-creme hover:bg-terra active:scale-95";
        break;
      case 'yellow':
        variantStyles = "bg-amarelo text-marrom hover:bg-amarelo/80 active:scale-95 font-semibold";
        break;
      case 'blue':
        variantStyles = "bg-azul text-marrom hover:bg-azul/80 active:scale-95 font-semibold";
        break;
      case 'secondary':
        variantStyles = "bg-creme text-marrom hover:bg-amarelo/30 active:scale-95";
        break;
      case 'hover':
        variantStyles = "bg-terra text-creme hover:bg-marrom active:scale-95";
        break;
      default:
        variantStyles = "bg-marrom text-creme hover:bg-terra active:scale-95";
    }
  }

  return (
    <button
      disabled={disabled || variant === 'inactive'}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
