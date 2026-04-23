import { Link } from 'react-router-dom';
import routePaths from '../routes/routePaths';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-card max-w-md p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-coralDark">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slateInk">Page not found</h1>
        <p className="mt-3 text-muted">The page you requested does not exist or may have moved.</p>
        <Link
          className="mt-6 inline-flex rounded-xl bg-coralDark px-5 py-3 font-medium text-white"
          to={routePaths.dashboard}
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
