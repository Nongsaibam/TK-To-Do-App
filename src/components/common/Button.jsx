import { cn } from '../../utils/helpers';

export default function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'rounded-[6px] border border-[#d1d5db] bg-white px-5 py-3 text-[#111827]',
    ghost: 'rounded-[6px] px-4 py-2 text-[#6b7280] hover:bg-[#f3f4f6]',
  };

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
