import { cn } from '../../utils/helpers';

export default function CardContainer({ children, className }) {
  return <div className={cn('rounded-[8px] border border-[#e5e7eb] bg-white p-5', className)}>{children}</div>;
}
