import { cn } from '../../utils/helpers';

export default function PageContainer({ children, className }) {
  return <section className={cn('space-y-6', className)}>{children}</section>;
}
